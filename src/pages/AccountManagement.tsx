import {useState, useEffect} from "preact/compat";
import {IRoleChange} from "../types/user.type.ts";
import userDataService, {UserDataService} from "../service/user.service.tsx";
import {useAuth} from "../auth/AuthProvider.tsx";
import Swal from "sweetalert2";

const AccountManagement = () => {
    const [adminRoleChange, setAdminRoleChange] = useState<IRoleChange>({
        id: -1n,
        status: "Loading",
        userRole: "ADMIN",
        userModelId: -1n

    })
    const [practitionerRoleChange, setPractitionerRoleChange] = useState<IRoleChange>({
        id: -1n,
        status: "Loading",
        userRole: "PRACTITIONER",
        userModelId: -1n
    })


    const requestStatus = (): void => {
        userDataService.getRoleChangeStatus()
            .then(value => {
                    setAdminRoleChange(value.data.adminRoleChange)
                    setPractitionerRoleChange(value.data.practitionerRoleChange)
                }
            )
            .catch(reason => console.log(reason))

    }
    const {token} = useAuth()
    useEffect(() => {
        userDataService.setToken(token)
        requestStatus()

    }, [])
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Account management</div>
            </div>
            <div>Users can manage own account here</div>
            <ul>
                <li>
                    <RoleRequest roleChangeStatus={practitionerRoleChange}
                                 service={userDataService}
                                 requestStatus={requestStatus}>
                    </RoleRequest>
                </li>
                <li><RoleRequest roleChangeStatus={adminRoleChange}
                                 service={userDataService}
                                 requestStatus={requestStatus}>
                </RoleRequest>
                </li>
            </ul>

        </div>
    )
}

export default AccountManagement


const RoleRequest = (
    {roleChangeStatus, service, requestStatus}: {
        roleChangeStatus: IRoleChange,
        service: UserDataService,
        requestStatus: Function

    }) => {

    const disableButton: boolean = roleChangeStatus.id > 1

    const onRequestButtonClick = () => {
        service.requestRoleChange(roleChangeStatus.userRole).then(r => {
                Swal.fire({title: r.data.message})
                // console.log('Request submitted for: ' + roleChangeStatus.userRole + ': ' + r.data.message)
                requestStatus()
            }
        ).catch(reason => console.log(reason.error))

    }

    return (
        <div className="RoleChange">
            <div><h3>Role</h3>: {roleChangeStatus.userRole}</div>
            <div><h3>Status</h3>: {roleChangeStatus.status}</div>
            <div><input className={'inputButton'} type="button" onClick={onRequestButtonClick} value={'Request'}
                        disabled={disableButton}/></div>
        </div>
    )
}
