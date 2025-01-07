import {UserDataService} from "../../service/user.service.tsx";
import {useEffect, useState,} from "preact/compat";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {IUserModel} from "../../types/user.type.ts";
import {useMemo} from "preact/compat";
import Swal from "sweetalert2";
import {useAuth} from "../../auth/AuthProvider.tsx";

type UserList = IUserModel[];

const UserManagement = () => {
    const {token} = useAuth()
    const uds: UserDataService  = new UserDataService(token )
    const [userList, setUserList] = useState<UserList>([])

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
                    setUserList(fetchedUsers)
                }
            )
            .catch(reason => console.log(reason))
    }

    function getUsers() {

        uds.getUsers()
            .then(r => {
                fetchUnapprovedRoleChanges(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function onClick(roleChangeId: bigint) {
        uds.approveRoleChange(roleChangeId).then(r => {
            if (r.data.requestSucceeded) {
                Swal.fire(r.data.message).then()
            } else {
                console.log(r.data.message)
                console.log(r.data.errors)
                Swal.fire("ERROR!", r.data.errors.join("\n"), "error").then()
            }
            getUsers()
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