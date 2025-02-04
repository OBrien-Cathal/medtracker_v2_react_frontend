import {IUserModel} from "../../types/user.type.ts";
import {useEffect, useMemo, useState} from "preact/compat";
import Swal from "sweetalert2";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {PatientDataService} from "../../service/patient.service.tsx";
import {useNavigate} from "react-router-dom";
import {MTPage, MTPageHeading, MTPageBody, MTPageContent, MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";

import CenteredFlex from "../../components/layout/CenteredFlex.tsx";


type IPatientRow = {
    patientId: bigint
    patientUsername: string
    status: string
    patientRegistrationId: bigint
    approved: boolean
}

type PatientList = IPatientRow[];
const PatientRegistration = () => {
    const {token} = useAuth()
    const [patientList, setPatientList] = useState<PatientList>([])
    const patientDataService = new PatientDataService(token)
    const navigate = useNavigate()

    const fetchPatientRegistrations = (fetchedUsers: IUserModel[]): void => {
        patientDataService.getPatientRegistrations()
            .then(value => {
                    let registrationRows: PatientList = []
                    for (const fetchedPatientUser of fetchedUsers) {

                        const foundPatientData = value.data.find(value1 => value1.userModelId == fetchedPatientUser.id);
                        if (foundPatientData) {
                            registrationRows = registrationRows.concat({
                                patientId: fetchedPatientUser.id,
                                patientUsername: fetchedPatientUser.username,
                                status: foundPatientData.approved ? 'Registered' : 'Awaiting Approval',
                                patientRegistrationId: foundPatientData.id,
                                approved: foundPatientData.approved
                            })
                        } else {
                            registrationRows = registrationRows.concat({
                                patientId: fetchedPatientUser.id,
                                patientUsername: fetchedPatientUser.username,
                                status: '-',
                                patientRegistrationId: -1n,
                                approved: false
                            })
                        }
                    }
                    setPatientList(registrationRows)
                }
            )
            .catch(reason => console.log(reason))
    }

    function getPatients() {
        patientDataService.getPatientUsers()
            .then(r => {

                fetchPatientRegistrations(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClickApprove(patientRegId: bigint) {
        patientDataService.approvePatientRegistration(patientRegId).then(r => {

            if (r.data.responseInfo.successful) {
                getPatients()
                Swal.fire(r.data.responseInfo.message).then()
            } else {
                console.log(r.data.responseInfo.message)
                console.log(r.data.responseInfo.errors)
                getPatients()
                Swal.fire("ERROR", r.data.responseInfo.errors.join("\n"), "error").then()
            }
        }).catch(e => console.log(e.data))

    }

    function onClickViewDetails(id: bigint) {
        console.log('clicked view details: ' + id)
        navigate('/patient-details/' + id)
    }


    useEffect(() => {
        getPatients();
    }, [])

    const Columns: ColumnDef<IPatientRow>[] = [
        {
            header: "ID",
            accessorKey: "patientId",
        },
        {
            header: "Email",
            accessorKey: "patientUsername",
        },
        {
            header: "Status",
            accessorKey: "status",
        },
        {
            header: "Register",
            cell: ({cell}) => {
                const id = cell.row.original.patientRegistrationId
                const disableButton = cell.row.original.patientRegistrationId < 0
                if (!cell.row.original.approved) {
                    return (
                        <input type={"button"} value="Approve"
                               onClick={() => onClickApprove(id)} disabled={disableButton}>
                            Approve
                        </input>)
                }
            }
        },
        {
            header: "Details",
            cell: ({cell}) => {
                const id = cell.row.original.patientId
                return (
                    <input type={"button"} value="View"
                           onClick={() => onClickViewDetails(id)}>
                        View
                    </input>)
            }
        }
    ];

    const columns = useMemo(() => Columns, []);


    return (
            <MTPage>
                <MTSectionWithControls
                    mtHeading={
                        <MTPageHeading>
                            Patients
                        </MTPageHeading>
                    }
                    mtDescription={
                        <MTPageDescription>
                            <p>List of all currently registered patients and new patient registration requests.
                            </p>
                            <span/>
                            <p>
                                New patient registrations can be viewed and approved here.
                            </p>
                        </MTPageDescription>}
                >
                </MTSectionWithControls>
                <MTPageBody>
                    <MTPageContent>
                        <CenteredFlex>
                            <ReactTable<IPatientRow> data={patientList} columns={columns}/>
                        </CenteredFlex>
                    </MTPageContent>
                </MTPageBody>
            </MTPage>

    )
}

export default PatientRegistration