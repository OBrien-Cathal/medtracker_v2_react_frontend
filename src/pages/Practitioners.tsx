import {IUserModel} from "../types/user.type.ts";
import {useEffect, useMemo, useState} from "preact/compat";
import {UserDataService} from "../service/user.service.tsx";
import Swal from "sweetalert2";
import {useAuth} from "../auth/AuthProvider.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../components/table/ReactTable.tsx";
import {PatientDataService} from "../service/patient.service.tsx";
import SectionComponentWithDescription from "../components/SectionComponentWithDescription.tsx";


type IPatientRegistrationRow = {
    practitionerId: bigint
    practitionerUsername: string
    status: string
    patientRegistrationId: bigint
}

type RegList = IPatientRegistrationRow[];
const Practitioners = () => {
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
                                practitionerId: fetchedPractitionerUser.id,
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
                if (r.data.responseInfo.successful) {
                    Swal.fire({
                        title: "Registration Successful",
                        text: "Request pending with id: " + r.data.data.id,
                        icon: "success"
                    }).then()
                } else {
                    console.log(r.data.responseInfo.message)
                    console.log(r.data.responseInfo.errors)
                    Swal.fire("ERROR", r.data.responseInfo.errors.join("\n"), "error").then()
                }
                getPractitioners()
            }
        ).catch(e => console.log(e.error))

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
            header: "Registration",
            cell: ({cell}) => {
                const id = cell.row.original.practitionerId
                const disableButton = cell.row.original.patientRegistrationId > 0
                const status = cell.row.original.status
                if (status === '-') {
                    return (
                        <input type={"button"} value="Register"
                               onClick={() => onClick(id)} disabled={disableButton}>
                            Register
                        </input>)
                } else {
                    return <text>{status}</text>
                }
            }
        }
    ];

    const columns = useMemo(() => Columns, []);


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
            </div>
            <br/>

            <SectionComponentWithDescription
                heading={
                <div className={'titleContainer'}>
                    Practitioner Overview
                </div>


                    }
                description={
                    <div>
                        <p>All available practitioners are listed below, it is possible to register with
                            multiple
                            practitioners.</p>
                        <p>
                            New Registrations will be reviewed and approved by the practitioner.
                        </p>
                    </div>
                }
                content={
                    <div className={'center-section-body'}><ReactTable<IPatientRegistrationRow>
                        data={practitionerList} columns={columns}/></div>
                }/>

        </div>
    )
}

export default Practitioners