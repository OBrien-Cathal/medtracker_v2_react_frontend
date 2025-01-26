import {useAuth} from "../../auth/AuthProvider.tsx";
import {useEffect, useMemo, useState} from "preact/compat";
import {ColumnDef} from "@tanstack/react-table";
import {MedicationService} from "../../service/medication.service.tsx";
import {IMedicationType} from "../../types/medication.type.ts";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {useNavigate} from "react-router-dom";
import {handleResponse, handleError} from "../utils/response-handler.tsx";

const Medications = () => {
    const {token} = useAuth()
    const navigate = useNavigate()

    const medicationService = new MedicationService(token)
    const [medicationList, setMedicationList] = useState<IMedicationType[]>([])
    const [medName, setMedName] = useState('')

    function getMedications() {
        medicationService.getMedicationsByPractitioner()
            .then(r => {
                setMedicationList(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClickViewDetails(id: bigint) {
        navigate('/medication-details/' + id)
    }

    function onClickAddMedication() {
        medicationService.addMedication(medName)
            .then((v) => {
                handleResponse(v)
                getMedications()
            })
            .catch(e => {
                handleError(e)
            })
    }

    useEffect(() => {
        getMedications();
    }, [])

    const Columns: ColumnDef<IMedicationType>[] = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Name",
            accessorKey: "name",
        },

        {
            header: "Details",
            cell: ({cell}) => {
                const medId = cell.row.original.id
                cell.row.original.id
                return (
                    <input type={"button"} value="View" onClick={() => onClickViewDetails(medId)}>
                        View Details
                    </input>)

            }
        },
    ];

    const columns = useMemo(() => Columns, []);
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Medications</div>
            </div>
            <div>Medications available + management</div>
            <ReactTable<IMedicationType> data={medicationList} columns={columns}/>
            <div className={'medicationEntry'}>
                <input
                    value={medName}
                    placeholder="Medication name"
                    onChange={(ev) => setMedName(ev.currentTarget.value)}
                />
                <input className={'inputButton'} type='submit' value={'Add Medication'} onClick={onClickAddMedication}/>
            </div>
        </div>
    )
}

export default Medications