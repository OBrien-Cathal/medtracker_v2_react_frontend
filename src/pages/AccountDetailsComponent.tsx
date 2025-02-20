import {useAuth} from "../auth/AuthProvider.tsx";
import MTSectionWithControls from "../components/MTSectionWithControls.tsx";

import AccountDetailsService from "../service/AccountDetailsService.tsx";
import {useEffect, useState} from "preact/compat";
import {IAccountDetailsType} from "../types/account-details.type.ts";
import {MTSectionBody, MTSectionDescription, MTSectionHeading} from "../components/section/MTSection.tsx";
import CenteredFlex from "../components/layout/CenteredFlex.tsx";

const PatientDetails = () => {
    const {token} = useAuth()

    const accountDetailsService = new AccountDetailsService(token);
    const accountDetailsPlaceholder: IAccountDetailsType = {
        firstName: '',
        surname: '', email: '', userModelId: ''
    }
    const [accountDetails, setAccountDetails] = useState<IAccountDetailsType>(accountDetailsPlaceholder)

    useEffect(() => {
        getAccountDetails()
    }, []);


    function getAccountDetails() {
        accountDetailsService.getAccountDetails()
            .then(value => {
                console.log(value)
                setAccountDetails(value.data)
            })
    }

    return (

        <MTSectionWithControls
            mtHeading={
                <MTSectionHeading>
                    <div>Account Details</div>
                </MTSectionHeading>}
            mtDescription={
                <MTSectionDescription>
                    Edit basic contact and personal information, edit is not yet implemented
                </MTSectionDescription>
            }>

            <MTSectionBody>
                <CenteredFlex>
                    <div className={'user-details'}>
                        <div className={'labeled-field'}>
                            <label>First Name</label>
                            <div className={'read-only-field'}>
                                <text>
                                    {
                                        accountDetails?.firstName}
                                </text>

                            </div>
                        </div>
                        <div className={'labeled-field'}>
                            <label>Surname</label>
                            <div className={'read-only-field'}>
                                <text>
                                    {
                                        accountDetails?.surname}
                                </text>

                            </div>
                        </div>
                        <div className={'labeled-field'}>
                            <label>Email</label>
                            <div className={'read-only-field'}>
                                <text>
                                    {
                                        accountDetails?.email}
                                </text>

                            </div>
                        </div>
                        <div className={'labeled-field'}>
                            <label>User ID</label>
                            <div className={'read-only-field'}>
                                <text>
                                    {
                                        accountDetails?.userModelId}
                                </text>

                            </div>
                        </div>
                    </div>
                </CenteredFlex>
            </MTSectionBody>
        </MTSectionWithControls>


    )
}

export default PatientDetails