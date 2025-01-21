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
    const prescriptionId =   Number(id) > 0 ? Number(id) : null
    const patientId = Number(userId)

    console.log('Rerender')

    const prescriptionDetailsPlaceholder: IPrescriptionDetailsType = {
        id: prescriptionId,
        doseMg: 0,
        medicationId: 1,
        beginTime: '',
        endTime: '',
        patientId: patientId,
        practitionerId: 2,
        prescriptionScheduleEntries: []
    }
    const editorPlaceholder = {
        errors: [],
        prescriptionDetails: prescriptionDetailsPlaceholder
    }
    const [editorModel, setEditorModel] = useState<EditorType>(editorPlaceholder)

    function logForURLParameters(string: string) {
        console.log(string + `prescription ID: ${prescriptionId} patient ID: ${patientId}`)
    }

    function getPrescriptionDetails(idOrNull: number | null) {
        if (!idOrNull) return
        logForURLParameters('Getting details..')

        prescriptionService.getPrescriptionDetails(idOrNull).then(r => {
            console.log('Get presc Then ')
            console.log(r.data)
            if (r.data.responseInfo.successful) {
                console.log(r.data.responseInfo.message)
                let newModel = newEditorModel()
                newModel.prescriptionDetails = r.data.prescriptionDetails
                console.log(newModel)
                setEditorModel(newModel)

            } else {
                console.log(r.data.responseInfo.message)
                console.log(r.data.responseInfo.errors)
                let newModel = newEditorModel()
                newModel.errors = r.data.responseInfo.errors
                console.log(newModel)
                setEditorModel(newModel)
            }


        })

    }


    function isEditModelValid(): boolean {
        editorModel.errors = validatePrescriptionDetails(editorModel.prescriptionDetails)
        return editorModel.errors.length === 0

    }

    function validatePrescriptionDetails(details: IPrescriptionDetailsType): string[] {

        logForURLParameters('Validating')
        console.log(editorModel)
        let tmpErrors: string[] = []

        logForURLParameters('Dose Validation')
        if (details.doseMg < 0) {
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

    function newEditorModel(): EditorType {
        const newPrescription: IPrescriptionDetailsType = {
            ...
                editorModel.prescriptionDetails
        }
        return {
            errors: editorModel.errors,
            prescriptionDetails: newPrescription
        }

    }


    function savePrescriptionDetails() {
        if (!isEditModelValid()) {
            logForURLParameters('On Save validation failed')
        }
        logForURLParameters('About to submit save')
        console.log(editorModel)
        prescriptionService.addPrescription(editorModel.prescriptionDetails).then(r => {
                console.log(r.data)
                if (r.data.responseInfo.successful) {

                    console.log(r.data.responseInfo.message)
                    getPrescriptionDetails(Number(r.data.prescriptionId))
                } else {
                    console.log(r.data.responseInfo.message)
                    console.log(r.data.responseInfo.message)
                    getPrescriptionDetails(prescriptionId)
                }
            }
        )


    }

    useEffect(() => {
        console.log('useeffect')
        getPrescriptionDetails(editorModel.prescriptionDetails.id);
    }, [])


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>PRACTITIONER PrescriptionDetails</div>
            </div>
            <div>Fill PrescriptionDetails here for ID: {prescriptionId}</div>
            <div> Patient ID: {patientId}</div>
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