import {UserDataService} from "../../service/user.service.tsx";
import {useEffect, useState,} from "preact/compat";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {IUserModel} from "../../types/user.type.ts";
import {useMemo} from "preact/compat";
import Swal from "sweetalert2";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {MTPage, MTPageBody, MTPageContent, MTPageDescription, MTPageHeading} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import CenteredFlex from "../../components/layout/CenteredFlex.tsx";
import {RoleChangeService} from "../../service/role-change.service.tsx";

type UserList = IUserModel[];

const UserManagement = () => {
    const {token} = useAuth()
    const uds: UserDataService = new UserDataService(token)
    const rcs = new RoleChangeService(token)
    const [userList, setUserList] = useState<UserList>([])

    const fetchUnapprovedRoleChanges = (fetchedUsers: IUserModel[]): void => {
        for (const fetchedUser of fetchedUsers) {
            fetchedUser.roleChange = []
        }
        rcs.getUnapprovedRoleChanges()
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
        rcs.approveRoleChange(roleChangeId).then(r => {
            if (r.data.responseInfo.successful) {
                Swal.fire(r.data.responseInfo.message).then()
            } else {
                console.log(r.data.responseInfo.message)
                console.log(r.data.responseInfo.errors)
                Swal.fire("ERROR!", r.data.responseInfo.errors.join("\n"), "error").then()
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
            header: "Practitioner role request",
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
            header: "Admin role request",
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
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        User management
                    </MTPageHeading>
                }
                mtDescription={
                    <MTPageDescription>
                        <p>Admin page for managing users</p>
                    </MTPageDescription>}
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <CenteredFlex>
                        <ReactTable<IUserModel> data={userList} columns={columns}/>
                    </CenteredFlex>
                </MTPageContent>
            </MTPageBody>
        </MTPage>
    )
}
export default UserManagement