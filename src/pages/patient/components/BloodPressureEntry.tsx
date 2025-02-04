import {useState} from "preact/compat";
import {TargetedEvent} from "react";
import Swal from "sweetalert2";
import {IBloodPressureData} from "../../../types/blood-pressure.type.ts";
import MTSectionWithControls from "../../../components/MTSectionWithControls.tsx";
import {
    MTSectionBody,
    MTSectionContent,
    MTSectionHeading
} from "../../../components/section/MTSection.tsx";
import Validation from "../../../components/Validation.tsx";

type Props = {
    saveBloodPressureReading: Function
    dayStages: string[]
}

type EditorModel = {
    editCopy: IBloodPressureData
    errors: string[]
}

const BloodPressureEntry = ({saveBloodPressureReading, dayStages}: Props) => {

    const editCopyPlaceholder: IBloodPressureData = {
        systole: 0,
        diastole: 0,
        heartRate: 0,
        dayStage: ''
    }
    const editorModelPlaceholder: EditorModel = {
        editCopy: editCopyPlaceholder,
        errors: getValidationErrorsFor(editCopyPlaceholder)
    }

    const [editorModel, setEditorModel] = useState(editorModelPlaceholder)

    function setEditorModelEditCopy(ec: IBloodPressureData) {
        setEditorModel({...editorModel, errors: getValidationErrorsFor(ec), editCopy: ec})
    }


    function onChangeSystole(e: TargetedEvent<HTMLInputElement, Event>) {
        setEditorModelEditCopy({...editorModel.editCopy, systole: numberFromEvent(e)})
    }

    function onChangeDiastole(e: TargetedEvent<HTMLInputElement, Event>) {
        setEditorModelEditCopy({...editorModel.editCopy, diastole: numberFromEvent(e)})
    }

    function onChangeHeartRate(e: TargetedEvent<HTMLInputElement, Event>) {
        setEditorModelEditCopy({...editorModel.editCopy, heartRate: numberFromEvent(e)})
    }

    function onChangeDayStage(ds: string) {
        setEditorModelEditCopy({...editorModel.editCopy, dayStage: ds})
    }

    function numberFromEvent(e: TargetedEvent<HTMLInputElement, Event>): number {
        return Number(e.currentTarget.value)
    }

    function isSafeBloodPressureValue(v: number) {
        return (v >= 0 && v < 200)
    }

    function getValidationErrorsFor(reading: IBloodPressureData): string[] {
        let errors: string[] = []
        let abnormalValueString: string = ' value is abnormal, please confirm and contact a doctor if reading is confirmed'
        if (!isSafeBloodPressureValue(reading.systole)) {
            errors = errors.concat('Systole' + abnormalValueString)
        }
        if (!isSafeBloodPressureValue(reading.diastole)) {
            errors = errors.concat('Diastole' + abnormalValueString)
        }
        if (!isSafeBloodPressureValue(reading.heartRate)) {
            errors = errors.concat('Heart Rate' + abnormalValueString)
        }
        if (reading.dayStage == null || (!dayStages.includes(reading.dayStage))) errors = errors.concat('Choose a day stage for the reading')
        return errors
    }

    function validateReading(reading: IBloodPressureData): boolean {
        let errors = getValidationErrorsFor(reading)
        if (errors.length === 0) return true

        Swal.fire({
            title: "Error!", icon: 'error', text: 'Errors must be addressed before saving changes'
        }).then()
        return false
    }

    function onClickSaveBloodPressureReading() {
        if (!validateReading(editorModel.editCopy)) return
        saveBloodPressureReading(editorModel.editCopy)
        setEditorModelEditCopy(editCopyPlaceholder)

    }

    return (
        <MTSectionWithControls
            mtHeading={
                <MTSectionHeading>
                    Entry
                </MTSectionHeading>
            }
        >
            <MTSectionBody>
                <MTSectionContent>
                    <div className={'labeled-field'}>
                        <label>Systole</label>
                        <input
                            value={
                                editorModel.editCopy.systole}
                            type={'number'}
                            placeholder='0'
                            onChange={(ev) => onChangeSystole(ev)}/>
                    </div>
                    <div className={'labeled-field'}>
                        <label>Diastole</label>
                        <input
                            value={
                                editorModel.editCopy.diastole}
                            type={'number'}
                            placeholder='0'
                            onChange={(ev) => onChangeDiastole(ev)}/>
                    </div>
                    <div className={'labeled-field'}>
                        <label>Heart Rate</label>
                        <input
                            value={
                                editorModel.editCopy.heartRate}
                            type={'number'}
                            placeholder='0'
                            onChange={(ev) => onChangeHeartRate(ev)}/>
                    </div>

                    <div className={'labeled-field'}>
                        <label>Day Stage</label>
                        <div className="dayStage-picker">
                            <select value={editorModel.editCopy.dayStage} onChange={event => {
                                onChangeDayStage(event.currentTarget.value)
                            }}>
                                {dayStages && dayStages.map((v) => {
                                    return (<option value={v}
                                                    label={v.substring(0, 1) + v.substring(1, v.length).toLowerCase()}></option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <br/>
                    {
                        editorModel.errors.length > 0 &&
                        <Validation errors={editorModel.errors}/>
                    }

                    <input className={'inputButton'} type='submit' value={'Save'}
                           onClick={onClickSaveBloodPressureReading}/>
                </MTSectionContent>
            </MTSectionBody>


        </MTSectionWithControls>


    )
}

export default BloodPressureEntry