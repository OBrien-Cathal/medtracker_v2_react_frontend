import {useAuth} from "../../auth/AuthProvider.tsx";
import {useEffect, useMemo, useState} from "preact/compat";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import {IPrescriptionType} from "../../types/prescription.type.ts";
import UserDetails from "../components/UserDetails.tsx";
import {IParams} from "../../types/params.type.ts";
import PatientDataVis from "./PatientDataVis.tsx";
import MaxWidthSection from "../../components/MaxWidthSection.tsx";
import SectionComponentWithDescription from "../../components/SectionComponentWithDescription.tsx";

const PatientDetails = () => {
    const {token} = useAuth()
    const navigate = useNavigate()

    const prescriptionService = new PrescriptionService(token)
    const [prescriptionList, setPrescriptionList] = useState<IPrescriptionType[]>([])
    const params = useParams<IParams>()
    const id = params.id


    function getPrescriptions() {
        prescriptionService.getPrescriptionsForPractitionerPatient(id)
            .then(r => {
                console.log("Received prescriptions")
                console.log(r.data)
                setPrescriptionList(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClickViewDetails(id: bigint) {
        console.log('clicked view details: ' + id)
        navigate('/prescription-details/' + id)
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
            header: "Medication",
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
                <div>Patient: {id}</div>
            </div>


            <br/>
            <MaxWidthSection content={
                <div>
                    <SectionComponentWithDescription
                        heading={<div>
                            Patient: {id} Details
                        </div>}
                        description={
                            <div>
                                <p>Basic details about a patient</p>
                            </div>
                        }
                        content={
                            <div className={'center-section-body'}>
                                <UserDetails></UserDetails>
                            </div>
                        }/>
                    <br/>
                    <SectionComponentWithDescription
                        heading={'Medical Records'}
                        description={
                            <div>
                                <p>Details about a patients medical records</p>
                            </div>
                        }
                        content={
                            <div className={'center-section-body'}>
                                Patient Detail here
                            </div>
                        }/>
                    <br/>
                    <SectionComponentWithDescription
                        heading={'Current Prescriptions'}
                        description={
                            <div>
                                <p>Prescriptions that are currently valid, (Work in progress still includes old
                                    prescriptions)</p>
                            </div>
                        }
                        content={
                            <div className={'center-section-body'}>
                                <ReactTable<IPrescriptionType> data={prescriptionList} columns={columns}/>
                            </div>
                        }/>
                    <br/>
                    <SectionComponentWithDescription
                        heading={'Expired Prescriptions'}
                        description={
                            <div>
                                <p>Prescriptions that are no longer valid, this section is under construction </p>
                            </div>
                        }
                        content={
                            <div className={'center-section-body'}>
                            </div>
                        }/>
                </div>

            }/>

            <br/>
            <PatientDataVis patientId={(params.id as unknown as bigint)}/>
        </div>
    )
}

export default PatientDetails