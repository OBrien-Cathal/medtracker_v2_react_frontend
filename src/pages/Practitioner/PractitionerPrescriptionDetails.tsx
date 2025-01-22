import {useNavigate, useParams} from "react-router-dom";
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
    serverErrors: string[]
    prescriptionDetails: IPrescriptionDetailsType
}

const PractitionerPrescriptionDetails = () => {
    const {token} = useAuth()
    const navigate = useNavigate()
    const prescriptionService = new PrescriptionService(token)

    const {id, userId} = useParams<IParams>()
    const isAdd = Number(id) < 0
    const editorPlaceholder = {
        errors: [],
        serverErrors: [],
        prescriptionDetails: {
            id: isAdd ? null : Number(id),
            doseMg: 0,
            medicationId: 1,
            beginTime: '',
            endTime: '',
            patientId: Number(userId),
            practitionerId: 2,
            prescriptionScheduleEntries: []
        }
    }
    const [editorModel, setEditorModel] = useState<EditorType>(editorPlaceholder)


    function logForURLParameters(string: string) {
        console.log(string + `prescription ID: ${editorModel.prescriptionDetails.id} patient ID: ${editorModel.prescriptionDetails.patientId}`)
    }

    function getPrescriptionDetails(idOrNull: number | null) {
        if (!idOrNull) return
        logForURLParameters('Getting details..')

        prescriptionService.getPrescriptionDetails(idOrNull).then(r => {
            console.log('Get presc Then ')
            console.log(r.data)
            if (r.data.responseInfo.successful) {
                console.log(r.data.responseInfo.message)
                resetEditorModel(r.data.prescriptionDetails)
            } else {
                console.log(r.data.responseInfo.message)
                console.log(r.data.responseInfo.errors)
                setEditorModelServerErrors(r.data.responseInfo.errors)
            }
        })
    }

    function isEditModelValid(): boolean {
        return (validatePrescriptionDetails(editorModel.prescriptionDetails).length === 0)
    }

    function validatePrescriptionDetails(details: IPrescriptionDetailsType): string[] {
        logForURLParameters('Validating')
        console.log(editorModel)

        let tmpErrors: string[] = []
        if (details.doseMg < 0) {
            tmpErrors = tmpErrors.concat('Dose is less than 0')
        }
        return tmpErrors
    }

    function updateDoseMg(event:
                          TargetedEvent<HTMLInputElement, Event>) {

        let prescriptionDetails = prescriptionDetailsEditCopy();
        prescriptionDetails.doseMg = Number(event.currentTarget.value)

        validateAndSetPrescriptionDetails(prescriptionDetails)
    }

    function resetEditorModel(p: IPrescriptionDetailsType) {
        setEditorModel({
            errors: [],
            serverErrors: [],
            prescriptionDetails: p
        })
    }

    function validateAndSetPrescriptionDetails(p: IPrescriptionDetailsType) {
        setEditorModel({
            errors: validatePrescriptionDetails(p),
            serverErrors: editorModel.serverErrors,
            prescriptionDetails: p
        })
    }

    function setEditorModelServerErrors(e: string[]) {
        setEditorModel({
            errors: editorModel.errors,
            serverErrors: e,
            prescriptionDetails: prescriptionDetailsEditCopy()
        })
    }

    function prescriptionDetailsEditCopy(): IPrescriptionDetailsType {
        return {
            ...
                editorModel.prescriptionDetails
        }
    }

    function submitPrescriptionDetails(details: IPrescriptionDetailsType) {
        if (isAdd) {
            return prescriptionService.addPrescription(details)
        } else {
            return prescriptionService.updatePrescription(details)
        }
    }

    function savePrescriptionDetails() {
        if (!isEditModelValid()) {
            logForURLParameters('On Save validation failed')
        }
        logForURLParameters('About to submit save')
        console.log(editorModel)
        submitPrescriptionDetails(editorModel.prescriptionDetails).then(r => {
                console.log(r.data)
                if (r.data.responseInfo.successful) {
                    console.log(r.data.responseInfo.message)
                    if (isAdd) {
                        console.log('isAdd')
                        console.log(r.data.prescriptionId)
                        navigate(`/full-prescription-details/${r.data.prescriptionId}/${userId}`)
                        return
                    }
                    getPrescriptionDetails(Number(r.data.prescriptionId))
                } else {
                    console.log(r.data.responseInfo.message)
                    console.log(r.data.responseInfo.errors)
                    setEditorModelServerErrors(r.data.responseInfo.errors)
                }
            }
        )
    }

    useEffect(() => {
        getPrescriptionDetails(editorModel.prescriptionDetails.id);
    }, [])


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>PRACTITIONER PrescriptionDetails</div>
            </div>
            <div>Fill PrescriptionDetails here for ID: {editorModel.prescriptionDetails.id}</div>
            <div> Patient ID: {editorModel.prescriptionDetails.patientId}</div>
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
                    {
                        editorModel.errors.length > 0 &&
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
                    }
                    {
                        editorModel.serverErrors.length > 0 &&
                        <SectionComponentWithDescription heading={'Server Errors'}
                                                         description={'Server errors will be cleared after successful submission'}
                                                         content={
                                                             <List
                                                                 items={editorModel.serverErrors}
                                                                 renderItem={(error) => (
                                                                     <li>
                                                                         <p>{error}</p>
                                                                     </li>
                                                                 )}/>
                                                         }>
                        </SectionComponentWithDescription>}
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