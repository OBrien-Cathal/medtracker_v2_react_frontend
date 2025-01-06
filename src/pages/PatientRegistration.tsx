import {IUserModel} from "../types/user.type.ts";
import {useEffect, useMemo, useState} from "preact/compat";
import {UserDataService} from "../service/user.service.tsx";
import Swal from "sweetalert2";
import {useAuth} from "../auth/AuthProvider.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../components/table/ReactTable.tsx";
import {PatientDataService} from "../service/patient.service.tsx";


type IPatientRegistrationRow = {
    practitionerId: bigint
    practitionerUsername: string
    status: string
    patientRegistrationId: bigint
}

type RegList = IPatientRegistrationRow[];
const PatientRegistration = () => {
    const {token} = useAuth()
    const [practitionerList, setPractitionerList] = useState<RegList>([])
    const uds = new UserDataService(token)
    const patientDataService = new PatientDataService(token)

    const fetchPatientRegistrations = (fetchedUsers: IUserModel[]): void => {
        patientDataService.getPatientRegistrations()
            .then(value => {
                    let registrationRows: RegList = []
                    for (const fetchedPractitionerUser of fetchedUsers) {

                        const foundPatientData = value.data.find(value1 => value1.practitionerId == fetchedPractitionerUser.id);

                        if (foundPatientData) {
                            registrationRows = registrationRows.concat({
                                practitionerId: foundPatientData.id,
                                practitionerUsername: fetchedPractitionerUser.username,
                                status: foundPatientData.approved ? 'Registered' : 'Pending',
                                patientRegistrationId: foundPatientData.id
                            })
                        } else {
                            registrationRows = registrationRows.concat({
                                practitionerId: fetchedPractitionerUser.id,
                                practitionerUsername: fetchedPractitionerUser.username,
                                status: '-',
                                patientRegistrationId: -1n
                            })
                        }
                    }
                    setPractitionerList(registrationRows)
                }
            )
            .catch(reason => console.log(reason))
    }

    function getPractitioners() {
        uds.getPractitionerUsers()
            .then(r => {
                fetchPatientRegistrations(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClick(roleChangeId: bigint) {
        patientDataService.submitPatientRegistration(roleChangeId).then(r => {
            if (r.data.data) {
                Swal.fire(r.data.message).then(getPractitioners)
            } else {
                console.log(r.data.message)
                console.log(r.data.errors)
                Swal.fire("ERROR", r.data.errors.join("\n"), "error").then(getPractitioners)
            }
        }).catch(e => console.log(e.error))

    }


    useEffect(() => {
        getPractitioners();
    }, [])

    const Columns: ColumnDef<IPatientRegistrationRow>[] = [
        {
            header: "ID",
            accessorKey: "practitionerId",
        },
        {
            header: "Email",
            accessorKey: "practitionerUsername",
        },
        {
            header: "Status",
            accessorKey: "status",
        },
        {
            header: "Register",
            cell: ({cell}) => {
                const id = cell.row.original.practitionerId
                const disableButton = cell.row.original.patientRegistrationId > 0
                return (
                    <input type={"button"} value="Register"
                           onClick={() => onClick(id)} disabled={disableButton}>
                        Register
                    </input>)
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
            <ReactTable<IPatientRegistrationRow> data={practitionerList} columns={columns}/>
        </div>
    )
}

export default PatientRegistration