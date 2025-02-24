import {useAuth} from "../../auth/AuthProvider.tsx";
import {useEffect, useMemo, useState} from "preact/compat";
import {ColumnDef} from "@tanstack/react-table";
import {MedicationService} from "../../service/medication.service.tsx";
import {IMedicationType} from "../../types/medication.type.ts";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {useNavigate} from "react-router-dom";
import {handleResponse, handleError} from "../utils/response-handler.tsx";
import {MTPage, MTPageHeading, MTPageBody, MTPageContent, MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import CenteredFlex from "../../components/layout/CenteredFlex.tsx";
import {MTSectionHeading, MTSectionBody, MTSectionContent,} from "../../components/section/MTSection.tsx";

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
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        Medications
                    </MTPageHeading>
                }
                mtDescription={
                    <MTPageDescription>
                        <p>Practitioners can view and add Medications here</p>
                    </MTPageDescription>}
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <MTSectionWithControls
                        mtHeading={
                            <MTSectionHeading>
                                Add Medication
                            </MTSectionHeading>
                        }>
                        <MTSectionBody>
                            <MTSectionContent>
                                <div className={'labeled-field'}>
                                    <label>Name</label>
                                    <input
                                        type={'text'}
                                        value={medName}
                                        placeholder="Enter medication name"
                                        onChange={(ev) => setMedName(ev.currentTarget.value)}
                                    />
                                </div>
                                <input className={'inputButton'} type='submit' value={'Add Medication'}
                                       onClick={onClickAddMedication}/></MTSectionContent>
                        </MTSectionBody>
                    </MTSectionWithControls>

                    <MTSectionWithControls
                        mtHeading={
                            <MTSectionHeading>
                                Available Medications
                            </MTSectionHeading>
                        }
                    >
                        <MTSectionBody>
                            <CenteredFlex>
                                <ReactTable<IMedicationType> data={medicationList} columns={columns}/>
                            </CenteredFlex>
                        </MTSectionBody>
                    </MTSectionWithControls>

                </MTPageContent>
            </MTPageBody>
        </MTPage>
    )
}

export default Medications