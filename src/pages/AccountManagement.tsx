import {useState, useEffect} from "preact/compat";
import {IRoleChange} from "../types/user.type.ts";
import {UserDataService} from "../service/user.service.tsx";
import {useAuth} from "../auth/AuthProvider.tsx";
import Swal from "sweetalert2";
import {List} from "../components/List.tsx";
import SectionComponentWithDescription from "../components/SectionComponentWithDescription.tsx";

const AccountManagement = () => {
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Account management</div>
            </div>
            <br/>
            <SectionComponentWithDescription
                heading={'Role Requests'}
                description={'Available roles can be requested below, these requests will be reviewed by a system admin'}
                content={<RoleRequests/>}
            />
        </div>
    )
}
export default AccountManagement


const RoleRequests = () => {
    const {token, currentRole} = useAuth()
    const canMakeRoleRequests = currentRole === 'USER'
    const userDataService: UserDataService = new UserDataService(token)

    const adminRoleChange = {
        id: -1n,
        status: "Loading",
        userRole: "ADMIN",
        userModelId: -1n,
        description: 'The Admin role is responsible for managing permissions and users within the Med Tracker system '
    }
    const practitionerRoleChange = {
        id: -1n,
        status: "Loading",
        userRole: "PRACTITIONER",
        userModelId: -1n, description: 'The Practitioner role allows users to register patients, review patient data, and view patient records'
    }

    const [roleChanges, setRoleChanges] = useState<IRoleChange[]>([adminRoleChange, practitionerRoleChange])

    const requestRoleChangeStatus = (): void => {
        userDataService.getRoleChangeStatus()
            .then(value => {
                    value.data.adminRoleChange.description = adminRoleChange.description
                    value.data.practitionerRoleChange.description = practitionerRoleChange.description

                    setRoleChanges([value.data.adminRoleChange, value.data.practitionerRoleChange])
                }
            )
            .catch(reason => console.log(reason))
    }

    useEffect(() => {
        requestRoleChangeStatus()
    }, [])

    const requestRoleChange = (requestedRoleName: string) => {
        userDataService.requestRoleChange(requestedRoleName).then(r => {
                Swal.fire({title: r.data.message})
                // console.log('Request submitted for: ' + roleChangeStatus.userRole + ': ' + r.data.message)
                requestRoleChangeStatus()
            }
        ).catch(reason => console.log(reason.error))
    }

    if (canMakeRoleRequests) {
        return (
            <section className={"RoleChanges"}>
                <br/>
                <List items={roleChanges} renderItem={(roleChange) => (
                    <li>
                        <RoleChange roleChangeStatus={roleChange} makeRoleRequest={requestRoleChange}/>
                    </li>
                )}/>
            </section>
        )
    } else return (<div>Current Role can not be adjusted</div>)
}


const RoleChange = (
    {roleChangeStatus, makeRoleRequest}: {
        roleChangeStatus: IRoleChange,
        makeRoleRequest: Function
    }) => {

    const disableButton: boolean = roleChangeStatus.id > 1
    const buttonText: string = (disableButton ? (roleChangeStatus.status) : 'Request')
    const prettyRoleName: string = roleChangeStatus.userRole.substring(0, 1).toUpperCase()
        .concat(roleChangeStatus.userRole.substring(1, roleChangeStatus.userRole.length).toLowerCase())

    const onRequestButtonClick = () => {
        makeRoleRequest(roleChangeStatus.userRole)
    }

    return (
        <SectionComponentWithDescription
            heading={prettyRoleName}
            description={roleChangeStatus.description}
            content={

                    <div className="RoleChange">
                        <div>
                            <input className={'inputButton'} type="button" onClick={onRequestButtonClick}
                                   value={buttonText}
                                   disabled={disableButton}/>
                            Request {prettyRoleName} role
                        </div>

                    </div>
                }/>

    )
}
