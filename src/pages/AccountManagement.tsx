import {useState, useEffect} from "preact/compat";
import {IRoleChange} from "../types/user.type.ts";
import {UserDataService} from "../service/user.service.tsx";
import {useAuth} from "../auth/AuthProvider.tsx";
import Swal from "sweetalert2";

const AccountManagement = () => {
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Account management</div>
            </div>
            <div>Users can manage own account here</div>
            <RoleRequests/>

        </div>
    )
}
export default AccountManagement


const RoleRequests = () => {

    const {token, currentRole} = useAuth()
    const canMakeRoleRequests = currentRole === 'USER'

    const userDataService: UserDataService = new UserDataService(token)
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


    const requestChanges = (): void => {
        userDataService.getRoleChangeStatus()
            .then(value => {
                    setAdminRoleChange(value.data.adminRoleChange)
                    setPractitionerRoleChange(value.data.practitionerRoleChange)
                }
            )
            .catch(reason => console.log(reason))
    }

    useEffect(() => {
        requestChanges()
    }, [])
    if (canMakeRoleRequests) {
        return (
            <section className={"RoleChanges"}>
                <ul>
                    <li>
                        <RoleChange roleChangeStatus={practitionerRoleChange}
                                    service={userDataService}
                                    requestStatus={requestChanges}>
                        </RoleChange>
                    </li>
                    <li><RoleChange roleChangeStatus={adminRoleChange}
                                    service={userDataService}
                                    requestStatus={requestChanges}>
                    </RoleChange>
                    </li>
                </ul>
            </section>
        )
    } else return (<div>Current Role can not be adjusted</div>)
}


const RoleChange = (
    {roleChangeStatus, service, requestStatus}: {
        roleChangeStatus: IRoleChange,
        service: UserDataService,
        requestStatus: Function

    }) => {

    const disableButton: boolean = roleChangeStatus.id > 1
    const buttonText: string = (disableButton ? (roleChangeStatus.status) : 'Request')

    const prettyRoleName: string = roleChangeStatus.userRole.substring(0, 1).toUpperCase()
        .concat(roleChangeStatus.userRole.substring(1, roleChangeStatus.userRole.length).toLowerCase())

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
            <div><input className={'inputButton'} type="button" onClick={onRequestButtonClick} value={buttonText}
                        disabled={disableButton}/></div>
            <div>Request {prettyRoleName} role</div>
        </div>
    )
}
