import {useParams} from "react-router-dom";
import {IParams} from "../../types/params.type.ts";
import {useState} from "preact/compat";
import {IPrescriptionDetailsType} from "../../types/prescription.type.ts";
import {useEffect} from "react";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {List} from "../../components/List.tsx";

const PractitionerPrescriptionDetails = () => {
    const {id, userId} = useParams<IParams>()
    const {token} = useAuth()
    const prescriptionService = new PrescriptionService(token)

    const prescriptionDetailsPlaceholder: IPrescriptionDetailsType = {
        id: -1,
        doseMg: -1,
        medicationId: -1,
        beginTime: '',
        endTime: '',
        patientId: -1,
        patientUsername: '',
        practitionerId: -1,
        practitionerUsername: '',
        prescriptionScheduleEntries: []
    }
    console.log('Rerender')
    const [prescription, setPrescription] = useState<IPrescriptionDetailsType>(prescriptionDetailsPlaceholder)
    const [errors, setErrors] = useState<string[]>([])
    const [doseMg, setDoseMg] = useState(prescriptionDetailsPlaceholder.doseMg)

    function getPrescriptionDetails() {
        if (id && Number(id) < 0) return
        console.log(`Getting details for prescription ID: ${id}`)

        setPrescription(prescriptionDetailsPlaceholder)

    }

    function validatePrescriptionDetails(): boolean {
        console.log(`Validating details for prescription ID: ${id}`)
        let tmpErrors: string[] = []
        if (doseMg < 0) {
            tmpErrors = tmpErrors.concat('Dose is less than 0')
        }
        setErrors(tmpErrors)
        console.log(`Dose: ${doseMg}`)
        return false
    }


    function savePrescriptionDetails() {
        if (!validatePrescriptionDetails()) {
            return console.log(`Invalid details for prescription ID: ${id}`)
        }
        console.log(`Saving validated details for prescription ID: ${id}`)
        prescriptionService.addPrescription(prescription).then(r => {
                if (r.data.successful) {
                    console.log(r.data.message)
                } else {
                    console.log(r.data.errors)
                }
            }
        )
        setPrescription(prescriptionDetailsPlaceholder)

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
                    value={doseMg}
                    type={'number'}
                    placeholder='0'
                    onChange={(ev) => {
                        setDoseMg(Number(ev.currentTarget.value))
                        validatePrescriptionDetails()
                    }
                    }
                />

            </div>
            <div>
                <section className={"validation-errors"}>
                    <br/>
                    <List items={errors} renderItem={(error) => (
                        <li>
                            <p>{error}</p>
                        </li>
                    )}/>
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