import {IPrescriptionDetailsType,} from "../../types/prescription.type.ts";
import {useEffect, useState} from "react";

type Props = {

    prescriptionDetails: IPrescriptionDetailsType
}

type EditorModel = {
    editCopy: IPrescriptionDetailsType
}

const PatientPrescriptionDetails =
    ({prescriptionDetails}: Props) => {

        const editModelPlaceholder: EditorModel = {
            editCopy: prescriptionDetails
        }

        const [editModel, setEditModel] = useState<EditorModel>({
            ...editModelPlaceholder,
            editCopy: prescriptionDetails
        })


        useEffect(() => {
            console.log('useEffect details component')

            setEditModel({
                editCopy: prescriptionDetails,
            })
        }, [prescriptionDetails])


        return (
            <div className="PrescriptionDetails">
                <div>
                    <div className={'labeled-field'}>
                        <label>Dose (mg)</label>
                        <input
                            value={
                                editModel.editCopy.doseMg}
                            type={'number'}
                            placeholder='0'
                        />
                    </div>
                    <br/>
                    <div className={'labeled-field'}>
                        <label>Start</label>
                        <input aria-label="Date and time"
                               value={
                                   editModel.editCopy.beginTime.toString().substring(0, 16)}
                               type="datetime-local"

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

                        />
                    </div>
                    <br/>
                    <div className={'labeled-field'}>
                        <label>Medication</label>
                        <div className="medication-name">
                            {editModel.editCopy.medication?.name}
                        </div>

                    </div>
                    <br/>
                    <div className={'labeled-field'}>
                        <label>Day Stages</label>
                        <div>
                            {editModel.editCopy.prescriptionScheduleEntries.map((ds) => {
                                return (
                                    <li>{ds.dayStage}</li>)
                            })}

                        </div>

                    </div>
                    <br/>
                </div>
                <div>


                </div>


            </div>
        )
    }

export default PatientPrescriptionDetails