import userDataService, {UserDataService} from "../service/user.service.tsx";
import authenticationManager from "../auth/authenticationManager.tsx";
import {useEffect, useState,} from "preact/compat";
import {ReactTable} from "../components/table/ReactTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {IUserModel} from "../types/user.type.ts";
import {useMemo} from "preact/compat";
import Swal from "sweetalert2";

type UserList = IUserModel[];

const UserManagement = () => {
    const [userList, setUserList] = useState<UserList>([])
    const uds: UserDataService = userDataService

    const fetchUnapprovedRoleChanges = (fetchedUsers: IUserModel[]): void => {
        console.log("REQUEST UNAPPROVED OUTGOING")
        for (const fetchedUser of fetchedUsers) {
            fetchedUser.roleChange = []
        }
        uds.getUnapprovedRoleChanges()
            .then(value => {
                    console.log("unapproved then")
                    console.log(value.data)


                    const roleChanges = value.data
                    for (const roleChangeElement of roleChanges) {
                        const found = fetchedUsers.find(value1 => value1.id == roleChangeElement.userModelId);
                        if (found) {
                            found.roleChange = found.roleChange.concat(roleChangeElement)
                        }
                    }
                    console.log("NeUSersList")
                    console.log(fetchedUsers)
                    setUserList(fetchedUsers)
                }
            )
            .catch(reason => console.log(reason))
    }


    function getUsers() {
        console.log("GETUSERS OUTGOING")
        uds.getUsers()
            .then(r => {
                console.log("getUsersthen")
                console.log(r.data)
                fetchUnapprovedRoleChanges(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClick(roleChangeId: bigint) {
        uds.approveRoleChange(roleChangeId).then(r => {
            console.log("approve returned")
            if (r.data.requestSucceeded) {
                Swal.fire(r.data.message).then(getUsers)
            } else {
                Swal.fire("ERROR", r.data.errors.join("\n"), "error").then(getUsers)
            }
        }).catch(e => console.log(e.error))
        console.log("CLICKED" + roleChangeId)
    }

    useEffect(() => {
        uds.setToken(authenticationManager.getToken())
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
            header: "Practitioner",
            cell: ({cell}) => {
                const found = cell.row.original.roleChange.find(value => value.userRole == "PRACTITIONER");
                if (found) {
                    return (
                        <input type={"button"} value="Approve" onClick={() => onClick(found.id)}>
                            Approve
                        </input>)
                } else return ''
            }
        },
        {
            header: "Admin",
            cell: ({cell}) => {
                const found = cell.row.original.roleChange.find(value => value.userRole == "ADMIN");
                if (found) {
                    return (
                        <input type={"button"} value="Approve" onClick={() => onClick(found.id)}>
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
                <div>User management</div>
            </div>
            <div>Admin page for managing users</div>
            <h3>Users</h3>
            <ReactTable<IUserModel> data={userList} columns={columns}/>

        </div>
    )
}
export default UserManagement