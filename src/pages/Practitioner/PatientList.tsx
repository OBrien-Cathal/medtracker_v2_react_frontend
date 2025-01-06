import {IUserModel} from "../../types/user.type.ts";
import {useEffect, useMemo, useState} from "preact/compat";
import Swal from "sweetalert2";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {PatientDataService} from "../../service/patient.service.tsx";


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

    const fetchPatientRegistrations = (fetchedUsers: IUserModel[]): void => {
        patientDataService.getPatientRegistrations()
            .then(value => {
                    let registrationRows: PatientList = []
                console.log("getPatientsRegistratione")
                console.log(value.data)
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
        console.log("getPatients")
        patientDataService.getPatientUsers()
            .then(r => {
                console.log("getPatients then")
                console.log(r.data)
                fetchPatientRegistrations(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClick(patientRegId: bigint) {
        patientDataService.approvePatientRegistration(patientRegId).then(r => {

            if (r.data.successful) {
                getPatients()
                Swal.fire(r.data.message).then()
            } else {
                console.log(r.data.message)
                console.log(r.data.errors)
                getPatients()
                Swal.fire("ERROR", r.data.errors.join("\n"), "error").then()
            }
        }).catch(e => console.log(e.data))

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
                if(!cell.row.original.approved){
                    return (
                        <input type={"button"} value="Approve"
                               onClick={() => onClick(id)} disabled={disableButton}>
                            Approve
                        </input>)
                }
            }
        }
    ];

    const columns = useMemo(() => Columns, []);


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Patient Registration</div>
            </div>
            <div>
                <p>All available practitioners are listed below, it is possible to register with multiple
                    practitioners.
                </p>
                <span/>
                <p>
                    The status of current registrations is also visible
                </p>
            </div>
            <ReactTable<IPatientRow> data={patientList} columns={columns}/>
        </div>
    )
}

export default PatientRegistration