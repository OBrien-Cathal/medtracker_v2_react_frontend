import {useParams} from "react-router-dom";
import {IParams} from "../../types/params.type.ts";
import {useState} from "preact/compat";
import {IPrescriptionDetailsType} from "../../types/prescription.type.ts";
import {useEffect} from "react";

const PractitionerPrescriptionDetails = () => {
    const {id, userId} = useParams<IParams>()
    const prescriptionDetailsPlaceholder: IPrescriptionDetailsType = {
        patientId: -1n,
        baseDetails: {
            id: -1n,
            doseMg: 0,
            medication: {id: -1n, name: ''},
            practitionerUsername: '',
            patientUsername: '',
            beginTime: '',
            endTime: ''
        },
        prescriptionScheduleEntries: []
    }

    const [prescription, setPrescription] = useState<IPrescriptionDetailsType>(prescriptionDetailsPlaceholder)

    const [doseMg, setDoseMg] = useState(prescriptionDetailsPlaceholder.baseDetails.doseMg)

    function getPrescriptionDetails() {
        if (id && BigInt(id) < 0) return
        console.log(`Getting details for prescription ID: ${id}`)

        setPrescription(prescriptionDetailsPlaceholder)

    }

    function validatePrescriptionDetails(): boolean {
        console.log(`Validating details for prescription ID: ${id}`)
        console.log(prescription.patientId)
        setPrescription(prescriptionDetailsPlaceholder)
        return false
    }

    function savePrescriptionDetails() {
        if (validatePrescriptionDetails())
            console.log(`Saving details for prescription ID: ${id}`)
        setPrescription(prescriptionDetailsPlaceholder)

    }

    useEffect(() => {
        if (userId) {
            prescriptionDetailsPlaceholder.patientId = BigInt(userId)
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
                    onChange={(ev) => setDoseMg(Number(ev.currentTarget.value))}
                />

            </div>
            <div className={'prescription-actions'}>
                <input className={'inputButton'} type='submit' value={'Save Prescription'} onClick={savePrescriptionDetails}/>

            </div>


        </div>
    )
}

export default PractitionerPrescriptionDetails