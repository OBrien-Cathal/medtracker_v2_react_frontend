import {IPrescriptionDetailsType,} from "../../types/prescription.type.ts";
import {useEffect, useState} from "react";
import {
    MTSectionBody,
    MTSectionContent,
    MTSectionDescription,
    MTSectionHeading
} from "../../components/section/MTSection.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import CenteredFlex from "../../components/layout/CenteredFlex.tsx";

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

        function prettyDateString(aDateString: string): string {
            if (!aDateString) return 'Open ended'
            let date = new Date(aDateString);
            return aDateString ? date.toDateString() + ' - ' + date.toLocaleTimeString() : '-'
        }


        useEffect(() => {
            console.log('useEffect details component')

            setEditModel({
                editCopy: prescriptionDetails,
            })
        }, [prescriptionDetails])


        return (
            <MTSectionWithControls
                mtHeading={
                    <MTSectionHeading>
                        {`Prescription ${prescriptionDetails.id ? prescriptionDetails.id : ''} Details ${prescriptionDetails.id ? '' : '(No selection)'}`}
                    </MTSectionHeading>}
                mtDescription={
                    <MTSectionDescription>
                        <p>Detailed view on selected prescription</p>
                    </MTSectionDescription>
                }>

                <MTSectionBody>
                    <MTSectionContent>
                        <CenteredFlex>
                            <div className="PrescriptionDetails">
                                <div>
                                    <div className={'labeled-field'}>
                                        <label>Dose (mg)</label>
                                        <div className={'read-only-field'}>
                                            <text>
                                                {
                                                    editModel.editCopy.doseMg}
                                            </text>

                                        </div>
                                    </div>

                                    <div className={'labeled-field'}>
                                        <label>Start</label>
                                        <div className={'read-only-field'}>
                                            <text>
                                                {
                                                    prettyDateString(editModel.editCopy.beginTime)
                                                }
                                            </text>


                                        </div>
                                    </div>

                                    <div className={'labeled-field'}>
                                        <label>End</label>
                                        <div className={'read-only-field'}>
                                            <text>
                                                {
                                                    prettyDateString(editModel.editCopy.endTime)
                                                }

                                            </text>

                                        </div>
                                    </div>

                                    <div className={'labeled-field'}>
                                        <label>Medication</label>
                                        <div className={'read-only-field'}>
                                            <text>
                                                {editModel.editCopy.medication?.name}
                                            </text>
                                        </div>
                                    </div>

                                </div>

                                <div className={'labeled-field'}>
                                    <label>Day Stages</label>
                                    <div className={'read-only-field'}>
                                        {editModel.editCopy.prescriptionScheduleEntries.map((ds) => {
                                            return (
                                                <li>
                                                    <text>{ds.dayStage}</text>
                                                </li>)
                                        })}

                                    </div>

                                </div>
                                <br/>
                            </div>
                        </CenteredFlex>
                    </MTSectionContent>
                </MTSectionBody>
            </MTSectionWithControls>
        )
    }

export default PatientPrescriptionDetails