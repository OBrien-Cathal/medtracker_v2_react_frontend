import {useAuth} from "../../auth/AuthProvider.tsx";
import {useEffect, useMemo, useState} from "preact/compat";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {useNavigate} from "react-router-dom";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import {IPrescriptionType} from "../../types/prescription.type.ts";
import SectionComponentWithDescription from "../../components/SectionComponentWithDescription.tsx";
import MaxWidthSection from "../../components/MaxWidthSection.tsx";

const Prescriptions = () => {
    const {token} = useAuth()
    const navigate = useNavigate()

    const prescriptionService = new PrescriptionService(token)
    const [prescriptionList, setPrescriptionList] = useState<IPrescriptionType[]>([])

    function getPrescriptions() {
        prescriptionService.getPrescriptions()
            .then(r => {
                console.log(r.data)
                setPrescriptionList(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClickViewDetails(id: bigint) {
        console.log('clicked view details: ' + id)
        navigate(`/patient-prescription-details/${id}`)
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
            header: "Prescriber",
            accessorKey: "practitionerUsername",
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
                <div>Prescriptions</div>
            </div>

            <MaxWidthSection content={
                <div>
                    <SectionComponentWithDescription
                        heading={'Current Prescriptions'}
                        description={
                            <div>
                                <p>Prescriptions that are currently valid, (Work in progress still includes old prescriptions)</p>
                            </div>
                        }
                        content={
                            <div className={'center-section-body'}>
                                <ReactTable<IPrescriptionType> data={prescriptionList} columns={columns}/>
                            </div>
                        }/>
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


        </div>
    )
}

export default Prescriptions