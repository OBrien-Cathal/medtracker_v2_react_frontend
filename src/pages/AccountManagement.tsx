import {useState, useEffect} from "preact/compat";
import {IRoleChange} from "../types/user.type.ts";
import {UserDataService} from "../service/user.service.tsx";
import {useAuth} from "../auth/AuthProvider.tsx";
import Swal from "sweetalert2";
import React from "react";
import MTSectionWithControls from "../components/MTSectionWithControls.tsx";
import {MTSectionBody, MTSectionDescription, MTSectionHeading} from "../components/section/MTSection.tsx";
import {MTPage, MTPageBody, MTPageContent, MTPageHeading} from "../components/pages/MTPage.tsx";

const AccountManagement = () => {
    return (
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        Account management
                    </MTPageHeading>
                }
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <MTSectionWithControls
                        mtHeading={
                            <MTSectionHeading>
                                Role Requests
                            </MTSectionHeading>
                        }
                        mtDescription={
                            <MTSectionDescription>
                                <p>
                                    Available roles can be requested below, any role requests will be reviewed by a
                                    system admin
                                </p>
                            </MTSectionDescription>
                        }
                    >
                        <MTSectionBody>
                            <RoleRequests/>
                        </MTSectionBody>
                    </MTSectionWithControls>

                </MTPageContent>
            </MTPageBody>
        </MTPage>


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


    const requestRoleChangeStatus = (): void => {
        userDataService.getRoleChangeStatus()
            .then(value => {
                    setAdminRoleChange(value.data.adminRoleChange)
                    setPractitionerRoleChange(value.data.practitionerRoleChange)
                }
            )
            .catch(reason => console.log(reason))
    }

    useEffect(() => {
        requestRoleChangeStatus()
    }, [])

    const requestRoleChange = (requestedRoleName: string) => {
        userDataService.requestRoleChange(requestedRoleName).then(r => {
                Swal.fire({title: r.data.responseInfo.message})
                // console.log('Request submitted for: ' + roleChangeStatus.userRole + ': ' + r.data.message)
                requestRoleChangeStatus()
            }
        ).catch(reason => console.log(reason.error))
    }

    if (canMakeRoleRequests) {
        return (
            <section className={"RoleChanges"}>
                <RoleChange roleChangeStatus={adminRoleChange} makeRoleRequest={requestRoleChange}
                            roleDescription={
                                <p>
                                    The Admin role is responsible for managing permissions and users within
                                    the Med Tracker system
                                </p>
                            }/>
                <RoleChange roleChangeStatus={practitionerRoleChange} makeRoleRequest={requestRoleChange}
                            roleDescription={
                                <p>
                                    The Practitioner role allows users to register patients, review patient data, and
                                    view patient records
                                </p>
                            }/>
            </section>
        )
    } else return (<div>Current role can not be adjusted</div>)
}


const RoleChange = (
    {roleChangeStatus, makeRoleRequest, roleDescription}: {
        roleChangeStatus: IRoleChange,
        makeRoleRequest: Function,
        roleDescription: React.ReactNode
    }) => {

    const disableButton: boolean = roleChangeStatus.id > 1
    const buttonText: string = (disableButton ? (roleChangeStatus.status) : 'Request')
    const prettyRoleName: string = roleChangeStatus.userRole.substring(0, 1).toUpperCase()
        .concat(roleChangeStatus.userRole.substring(1, roleChangeStatus.userRole.length).toLowerCase())


    const onRequestButtonClick = () => {
        makeRoleRequest(roleChangeStatus.userRole)
    }

    return (
        <MTSectionWithControls
            mtHeading={
                <MTSectionHeading>
                    {prettyRoleName}
                </MTSectionHeading>
            }

            mtDescription={
                <MTSectionDescription>
                    {roleDescription}
                </MTSectionDescription>}
        >
            <MTSectionBody>
                <div className="RoleChange">
                    <div>
                        <input className={'inputButton'} type="button" onClick={onRequestButtonClick}
                               value={buttonText}
                               disabled={disableButton}/>
                        Request {prettyRoleName} role
                    </div>

                </div>
            </MTSectionBody>
        </MTSectionWithControls>


    )
}
