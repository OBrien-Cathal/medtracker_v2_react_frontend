import userService from "../service/user.service.tsx";
import authenticationManager from "../auth/authenticationManager.tsx";
import {useEffect, useState} from "preact/compat";
import {ReactTable} from "../components/table/ReactTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {IUserModel} from "../types/user.type.ts";
import {useMemo} from "preact/compat";

type UserList = IUserModel[];

const UserManagement = () => {
    const [userList, setUserList] = useState<UserList>([])
    useEffect(() => {
        userService.setToken(authenticationManager.getToken())
        userService.getUsers()
            .then(r => {
                setUserList(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
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
            <ReactTable<IUserModel> data={userList} columns={columns} />

        </div>
    )
}
export default UserManagement