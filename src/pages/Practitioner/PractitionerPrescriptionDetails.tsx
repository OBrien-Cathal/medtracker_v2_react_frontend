import {TargetedEvent, useState} from "preact/compat";
import {IPrescriptionDetailsType, IPrescriptionScheduleEntryType} from "../../types/prescription.type.ts";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import {useEffect} from "react";
import Select from "react-select"
import {IMedicationType} from "../../types/medication.type.ts";
import {MedicationService} from "../../service/medication.service.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {
    MTSectionBody,
    MTSectionContent,
    MTSectionDescription,
    MTSectionHeading
} from "../../components/section/MTSection.tsx";
import Validation from "../../components/Validation.tsx";
import CenteredFlex from "../../components/layout/CenteredFlex.tsx";


type Props = {
    token: string
    patientId: number | null
    prescriptionDetails: IPrescriptionDetailsType
    getPrescriptionDetails: Function
}

type EditorModel = {
    errors: string[]
    serverErrors: string[]
    editCopy: IPrescriptionDetailsType

}

type DayStageSelector = {
    id: number | null
    dayStage: string
    included: boolean
}

const PractitionerPrescriptionDetails =
    ({token, prescriptionDetails, getPrescriptionDetails}: Props) => {
        console.log('render details')
        const editModelPlaceholder: EditorModel = {
            errors: [],
            serverErrors: [],
            editCopy: prescriptionDetails
        }
        const prescriptionService = new PrescriptionService(token)

        const [editModel, setEditModel] = useState<EditorModel>({
            ...editModelPlaceholder,
            editCopy: prescriptionDetails
        })
        const [medications, setMedications] = useState<IMedicationType[]>([])
        const medicationService = new MedicationService(token)
        const [dayStageSelectors, setDayStageSelectors] = useState<DayStageSelector[]>([])

        function getMedications() {
            console.log('Recieved medications')
            medicationService.getMedicationsByPractitioner()
                .then(r => {
                    setMedications(r.data)
                }).catch((reason) => {
                console.log(reason.errors)
            });
        }

        function getDayStages() {
            prescriptionService.getDayStages()
                .then(r => {
                    console.log('Recieved daystages')
                    let selectors = r.data.map((v) => {
                        return asDayStageSelector(v, prescriptionDetails.prescriptionScheduleEntries)
                    });
                    console.log(selectors)
                    setDayStageSelectors(selectors)
                }).catch((reason) => {
                console.log(reason.errors)
            });
        }


        function getPrescriptionScheduleEntries(): IPrescriptionScheduleEntryType[] {
            let included = dayStageSelectors.filter((v) => {
                return v.included
            });
            console.log(included)
            return included.map((dss) => {
                return {
                    id: dss.id ? (dss.id) : null,
                    dayStage: dss.dayStage
                }
            })
        }

        function asDayStageSelector(ds: string, entries: IPrescriptionScheduleEntryType[]): DayStageSelector {
            let existing = entries.find((ps) => ps.dayStage === ds);
            let id = existing ? Number(existing.id) : null

            return {id: id, included: !!existing, dayStage: ds}
        }

        function logForURLParameters(string: string) {
            console.log(string + `prescription ID: ${prescriptionDetails.id} patient ID: ${prescriptionDetails.patientId}`)
        }

        function getValidationErrorsFor(ec: IPrescriptionDetailsType): string[] {
            logForURLParameters('Validating')
            let tmpErrors: string[] = []

            if (ec.doseMg < 0) {
                tmpErrors = tmpErrors.concat('Dose is less than 0')
            }
            return tmpErrors
        }

        function setEditModelEditCopy(ec: IPrescriptionDetailsType) {
            setEditModel({...editModel, errors: getValidationErrorsFor(ec), editCopy: ec})
        }

        function setEditModelServerErrors(serverErrors: string[]) {
            setEditModel({...editModel, serverErrors: serverErrors})
        }

        function updateDoseMg(event:
                              TargetedEvent<HTMLInputElement, Event>) {
            console.log('updateDose')
            setEditModelEditCopy({
                    ...editModel.editCopy,
                    doseMg: Number(event.currentTarget.value)
                }
            )
        }

        function updateBeginTime(event:
                                 TargetedEvent<HTMLInputElement, Event>) {
            console.log('updateBegin')
            setEditModelEditCopy({
                    ...editModel.editCopy,
                    beginTime: (
                        (event.currentTarget.value))
                }
            )
        }

        function updateEndTime(event:
                               TargetedEvent<HTMLInputElement, Event>) {
            console.log('updateEnd')
            setEditModelEditCopy({
                    ...editModel.editCopy,
                    endTime: ((event.currentTarget.value))
                }
            )
        }

        function updateDayStage(event:
                                TargetedEvent<HTMLInputElement, Event>) {
            console.log('updateDayStage')

            let name = event.currentTarget.name;
            let id = Number(event.currentTarget.id);
            let checked = event.currentTarget.checked;

            console.log(`checked: ${checked} name: ${name} id: ${id}`)

            let newSelectors = dayStageSelectors.map((dss) => {
                return {
                    ...dss,
                    included: dss.dayStage === name ? checked : dss.included
                }
            });
            console.log(newSelectors)
            setDayStageSelectors(newSelectors)
        }

        function updateMedication(med: IMedicationType | null) {
            console.log('updateMed')

            setEditModelEditCopy({
                    ...editModel.editCopy,
                    medication: med ? med : null
                }
            )
        }

        function submitPrescriptionDetails(toSave: IPrescriptionDetailsType) {
            if (toSave.id === null) {
                console.log('add')
                return prescriptionService.addPrescription(toSave)
            } else {
                console.log('update')
                return prescriptionService.updatePrescription(toSave)
            }
        }

        function savePrescriptionDetails() {
            let validationErrors = getValidationErrorsFor(editModel.editCopy);
            if (validationErrors.length !== 0) {
                logForURLParameters('On Save validation failed')
                return
            }
            let toSave: IPrescriptionDetailsType = {
                ...editModel.editCopy,
                prescriptionScheduleEntries: getPrescriptionScheduleEntries()
            }
            logForURLParameters('About to submit save')
            console.log(toSave)
            submitPrescriptionDetails(toSave).then(r => {
                    console.log(r.data)
                    if (r.data.responseInfo.successful) {
                        console.log(r.data.responseInfo.message)
                        getPrescriptionDetails(r.data.prescriptionId)
                    } else {
                        console.log(r.data.responseInfo.message)
                        console.log(r.data.responseInfo.errors)
                        setEditModelServerErrors(r.data.responseInfo.errors)
                    }
                }
            )
        }

        useEffect(() => {
            console.log('useEffect details component')
            getMedications()
            getDayStages()
            setEditModel({
                errors: [], serverErrors: [], editCopy: prescriptionDetails,
            })
        }, [prescriptionDetails])


        return (<MTSectionWithControls
                mtHeading={
                    <MTSectionHeading>
                        {`Prescription ${prescriptionDetails.id ? prescriptionDetails.id : ''} Details ${prescriptionDetails.id ? '' : '(New)'}`}
                    </MTSectionHeading>}
                mtDescription={
                    <MTSectionDescription>
                        <p>View and Edit prescriptions, new prescriptions can also be
                            added when there is no current selection</p>
                    </MTSectionDescription>
                }>

                <MTSectionBody>
                    <MTSectionContent>
                        <CenteredFlex>
                            <div className="PrescriptionDetails">
                                <div>
                                    <div className={'labeled-field'}>
                                        <label>Dose (mg)</label>
                                        <input
                                            value={
                                                editModel.editCopy.doseMg}
                                            type={'number'}
                                            placeholder='0'
                                            onChange={(ev) => updateDoseMg(ev)}/>
                                    </div>
                                    <br/>
                                    <div className={'labeled-field'}>
                                        <label>Start</label>
                                        <input aria-label="Date and time"
                                               value={
                                                   editModel.editCopy.beginTime.toString().substring(0, 16)}
                                               type="datetime-local"
                                               onChange={(ev) => updateBeginTime(ev)}
                                        />
                                    </div>
                                    <br/>
                                    <div className={'labeled-field'}>
                                        <label>End</label>
                                        <input aria-label="Date and time"
                                               value={
                                                   editModel.editCopy.endTime ?
                                                       editModel.editCopy.endTime.toString().substring(0, 16) : ''}
                                               type="datetime-local"
                                               onChange={(ev) => updateEndTime(ev)}
                                        />
                                    </div>
                                    <br/>
                                    <div className={'labeled-field'}>
                                        <label>Medication</label>
                                        <div className="medication-picker">
                                            <Select
                                                // If you don't need a state you can remove the two following lines value & onChange
                                                value={editModel.editCopy.medication}
                                                onChange={(option: IMedicationType | null) => {
                                                    updateMedication(option);
                                                }}
                                                getOptionLabel={(med: IMedicationType) => med.name}
                                                getOptionValue={(med: IMedicationType) => med.name}
                                                options={medications}
                                                isClearable={false}
                                                backspaceRemovesValue={true}
                                            />
                                        </div>

                                    </div>
                                    <br/>
                                    <div className={'labeled-field'}>
                                        <label>Day Stages</label>
                                        <div>
                                            {dayStageSelectors && dayStageSelectors.map((ds) => {
                                                return (
                                                    <div>
                                                        <input id={ds.dayStage} type={'checkbox'} name={ds.dayStage}
                                                               checked={ds.included}
                                                               onChange={(ev) => updateDayStage(ev)}>

                                                        </input>
                                                        <label for={ds.dayStage}>{ds.dayStage}</label>
                                                    </div>)
                                            })}

                                        </div>

                                    </div>
                                    <br/>
                                </div>
                                <div>
                                    <br/>
                                    {
                                        editModel.errors.length > 0 &&
                                        <Validation errors={editModel.errors}/>
                                    }
                                    {
                                        editModel.serverErrors.length > 0 &&
                                        <Validation errors={editModel.serverErrors}/>
                                    }
                                </div>
                                <div className={'prescription-actions'}>
                                    <input className={'inputButton'} type='submit' value={'Save'}
                                           onClick={savePrescriptionDetails}/>
                                    <input className={'inputButton'} type='submit' value={'Reset Edits'}
                                           onClick={() => {
                                               getPrescriptionDetails(null)
                                           }}/>
                                </div>


                            </div>
                        </CenteredFlex>
                    </MTSectionContent>
                </MTSectionBody>
            </MTSectionWithControls>
        )
    }

export default PractitionerPrescriptionDetails