import {IUserModel} from "../types/user.type.ts";
import {useEffect, useMemo, useState} from "preact/compat";
import {UserDataService} from "../service/user.service.tsx";
import {useAuth} from "../auth/AuthProvider.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../components/table/ReactTable.tsx";
import {PatientDataService} from "../service/patient.service.tsx";
import {MTPage, MTPageHeading, MTPageDescription, MTPageContent, MTPageBody} from "../components/pages/MTPage.tsx";
import MTSectionWithControls from "../components/MTSectionWithControls.tsx";
import CenteredFlex from "../components/layout/CenteredFlex.tsx";
import {handleError, handleResponseAndNotify} from "./utils/response-handler.tsx";


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
                handleResponseAndNotify(r)
                getPractitioners()
            }
        ).catch(e => handleError(e))
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
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        Practitioner Overview
                    </MTPageHeading>
                }
                mtDescription={<MTPageDescription>
                    <p>All available practitioners are listed below, it is possible to register with
                        multiple
                        practitioners.</p>
                    <p>
                        New Registrations will be reviewed and approved by the practitioner.
                    </p>
                </MTPageDescription>}
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <CenteredFlex>
                        <ReactTable<IPatientRegistrationRow>
                            data={practitionerList} columns={columns}/>
                    </CenteredFlex>
                </MTPageContent>
            </MTPageBody>
        </MTPage>
    )
}

export default Practitioners