import {useAuth} from "../../auth/AuthProvider.tsx";
import {useEffect, useMemo, useState} from "preact/compat";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import {IPrescriptionType} from "../../types/prescription.type.ts";
import UserDetails from "../components/UserDetails.tsx";
import {IParams} from "../../types/params.type.ts";

const PatientDetails = () => {
    const {token} = useAuth()
    const navigate = useNavigate()

    const prescriptionService = new PrescriptionService(token)
    const [prescriptionList, setPrescriptionList] = useState<IPrescriptionType[]>([])
    const params = useParams<IParams>()
    const id = params.id


    function getPrescriptions() {
        prescriptionService.getPrescriptionsForPractitionerPatient()
            .then(r => {
                console.log(r.data)
                setPrescriptionList(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClickViewDetails(id: bigint) {
        console.log('clicked view details')
        navigate('/medications?' + id)
    }


    useEffect(() => {
        getPrescriptions();
    }, [])

    const Columns: ColumnDef<IPrescriptionType>[] = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Name",
            accessorKey: "medication.name",
        },
        {
            header: "Patient",
            accessorKey: "patientUsername",
        },
        {
            header: "Start",
            accessorKey: "beginTime",
        },
        {
            header: "End",
            accessorKey: "endTime",
        },

        {
            header: "Details",
            cell: ({cell}) => {
                const prescriptionId = cell.row.original.id
                return (
                    <input type={"button"} value="View" onClick={() => onClickViewDetails(prescriptionId)}>
                        View Details
                    </input>)
            }
        },
    ];

    const columns = useMemo(() => Columns, []);
    return (
        <div className="mainContainer">

            <div className={'titleContainer'}>
                <div>Patient: {id} Details</div>
            </div>
            <UserDetails></UserDetails>
            <div className="componentContainer">
                <div className={'titleContainer'}>
                    <div>Medical details</div>
                </div>
                <div>Private medical info about a user, get from server.</div>
            </div>
            <div className="componentContainer">
                <div className={'titleContainer'}>
                    <div>Prescriptions</div>
                </div>
                <div>List of current prescriptions,restrict this to only for the current patient</div>

            </div>
            <div><ReactTable<IPrescriptionType> data={prescriptionList} columns={columns}/></div>
        </div>
    )
}

export default PatientDetails