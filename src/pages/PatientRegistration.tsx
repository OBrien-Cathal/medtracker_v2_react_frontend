import {IUserModel} from "../types/user.type.ts";
import {useEffect, useMemo, useState} from "preact/compat";
import {UserDataService} from "../service/user.service.tsx";
import Swal from "sweetalert2";
import {useAuth} from "../auth/AuthProvider.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../components/table/ReactTable.tsx";

type UserList = IUserModel[];
const PatientRegistration = () => {
    const {token} = useAuth()
    const [practitionerList, setPractitionerList] = useState<UserList>([])
    const uds: UserDataService = new UserDataService(token)

    const fetchUnapprovedRoleChanges = (fetchedUsers: IUserModel[]): void => {
        for (const fetchedUser of fetchedUsers) {
            fetchedUser.roleChange = []
        }
        uds.getUnapprovedRoleChanges()
            .then(value => {
                    const roleChanges = value.data
                    for (const roleChangeElement of roleChanges) {
                        const found = fetchedUsers.find(value1 => value1.id == roleChangeElement.userModelId);
                        if (found) {
                            found.roleChange = found.roleChange.concat(roleChangeElement)
                        }
                    }
                    setPractitionerList(fetchedUsers)
                }
            )
            .catch(reason => console.log(reason))
    }

    function getUsers() {
        uds.getPractitionerUsers()
            .then(r => {
                fetchUnapprovedRoleChanges(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClick(roleChangeId: bigint) {
        uds.approveRoleChange(roleChangeId).then(r => {

            if (r.data.requestSucceeded) {
                Swal.fire(r.data.message).then(getUsers)
            } else {
                console.log(r.data.message)
                console.log(r.data.errors)
                Swal.fire("ERROR", r.data.errors.join("\n"), "error").then(getUsers)
            }
        }).catch(e => console.log(e.error))

    }


    useEffect(() => {

        getUsers();

    }, [])

    const Columns: ColumnDef<IUserModel>[] = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Email",
            accessorKey: "username",
        },
        {
            header: "Role",
            accessorKey: "role",
        },
        {
            header: "Register",
            cell: ({cell}) => {
                const found = cell.row.original.roleChange.find(value => value.userRole == "PRACTITIONER");
                if (found) {
                    return (
                        <input type={"button"} value="Send Request" onClick={() => onClick(found.id)}>
                            Approve
                        </input>)
                } else return ''
            }
        }
    ];

    const columns = useMemo(() => Columns, []);


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Practitioners</div>
            </div>
            <div>Patient Registration</div>
            <ReactTable<IUserModel> data={practitionerList} columns={columns}/>
        </div>
    )
}

export default PatientRegistration