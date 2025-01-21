import {useParams} from "react-router-dom";
import {IParams} from "../../types/params.type.ts";
import {TargetedEvent, useState} from "preact/compat";
import {IPrescriptionDetailsType} from "../../types/prescription.type.ts";
import {useEffect} from "react";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {List} from "../../components/List.tsx";
import SectionComponentWithDescription from "../../components/SectionComponentWithDescription.tsx";


type EditorType = {
    errors: string[]
    prescriptionDetails: IPrescriptionDetailsType
}

const PractitionerPrescriptionDetails = () => {
    const {id, userId} = useParams<IParams>()
    const {token} = useAuth()
    const prescriptionService = new PrescriptionService(token)

    console.log('Rerender')

    const prescriptionDetailsPlaceholder: IPrescriptionDetailsType = {
        id: Number(userId),
        doseMg: 0,
        medicationId: 1,
        beginTime: '',
        endTime: '',
        patientId: Number(id),
        practitionerId: 2,
        prescriptionScheduleEntries: []
    }
    const editorPlaceholder = {
        errors: [],
        prescriptionDetails: prescriptionDetailsPlaceholder
    }
    const [editorModel, setEditorModel] = useState<EditorType>(editorPlaceholder)


    function getPrescriptionDetails() {
        if (id && Number(id) < 0) return
        console.log(`Getting details for prescription ID: ${id}`)
        setEditorModel(editorPlaceholder)
    }


    function isEditModelValid(): boolean {
        editorModel.errors = validatePrescriptionDetails(editorModel.prescriptionDetails)
        return editorModel.errors.length === 0

    }

    function validatePrescriptionDetails(details: IPrescriptionDetailsType): string[] {
        console.log(`Validating details for prescription ID: ${id}`)
        let tmpErrors: string[] = []
        console.log(`dose validation: ${details.doseMg}`)
        if (details.doseMg < 0) {
            console.log(`dose failed valid: ${details.doseMg}`)
            tmpErrors = tmpErrors.concat('Dose is less than 0')
        }
        return tmpErrors
    }

    function updateDoseMg(event:
                          TargetedEvent<HTMLInputElement, Event>) {
        const newPrescription: IPrescriptionDetailsType = {
            ...
                editorModel.prescriptionDetails, doseMg: Number(event.currentTarget.value)
        }
        let errors = validatePrescriptionDetails(newPrescription);
        setEditorModel({
            errors: errors,
            prescriptionDetails: newPrescription
        })
    }


    function savePrescriptionDetails() {
        if (!isEditModelValid()) {
            return console.log(`Invalid details for prescription ID: ${id}`)
        }
        console.log(`Saving validated details for prescription ID: ${id}`)
        prescriptionService.addPrescription(editorModel.prescriptionDetails).then(r => {
                if (r.data.successful) {
                    console.log(r.data.message)
                } else {
                    console.log(r.data.errors)
                }
            }
        )
        setEditorModel(editorPlaceholder)
    }

    useEffect(() => {
        if (userId) {
            prescriptionDetailsPlaceholder.patientId = Number(userId)
        }
        getPrescriptionDetails();
    }, [])


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>PRACTITIONER PrescriptionDetails</div>
            </div>
            <div>Fill PrescriptionDetails here for ID: {id}</div>
            <div> Patient ID: {userId}</div>
            <div>
                <input
                    value={editorModel.prescriptionDetails.doseMg}
                    type={'number'}
                    placeholder='0'
                    onChange={(ev) => {
                        updateDoseMg(ev)
                    }
                    }
                />

            </div>
            <div>
                <section className={"validation-errors"}>
                    <br/>
                    <SectionComponentWithDescription heading={'Errors'}
                                                     description={'Errors must be corrected before submission'}
                                                     content={
                                                         <List items={editorModel.errors} renderItem={(error) => (
                                                             <li>
                                                                 <p>{error}</p>
                                                             </li>
                                                         )}/>
                                                     }>
                    </SectionComponentWithDescription>
                </section>


            </div>
            <div className={'prescription-actions'}>
                <input className={'inputButton'} type='submit' value={'Save Prescription'}
                       onClick={savePrescriptionDetails}/>

            </div>


        </div>
    )
}

export default PractitionerPrescriptionDetails