import {useAuth} from "../auth/AuthProvider.tsx";
import MTSectionWithControls from "../components/MTSectionWithControls.tsx";

import AccountDetailsService from "../service/AccountDetailsService.tsx";
import {useEffect, useState} from "preact/compat";
import {IAccountDetailsType} from "../types/account-details.type.ts";
import {MTSectionBody, MTSectionDescription, MTSectionHeading} from "../components/section/MTSection.tsx";
import CenteredFlex from "../components/layout/CenteredFlex.tsx";
import {handleError, handleResponseAndNotify} from "./utils/response-handler.tsx";

const AccountDetailsComponent = () => {
    const {token} = useAuth()

    const accountDetailsService = new AccountDetailsService(token);
    const accountDetailsPlaceholder: IAccountDetailsType = {
        firstName: '',
        surname: '', email: '', userModelId: ''
    }


    console.log("render")
    const [accountDetails, setAccountDetails] = useState<IAccountDetailsType>(accountDetailsPlaceholder)
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')

    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        getAccountDetails()
    }, []);


    function getAccountDetails() {
        accountDetailsService.getAccountDetails()
            .then(value => {
                setAccountDetails(value.data)
                setFirstName(value.data.firstName)
                setSurname(value.data.surname)
                setDisableSave(true)
            })
    }

    function firstNameChanged(newVal: string) {
        setDisableSave(newVal === accountDetails?.firstName)
        setFirstName(newVal)
    }
    function surnameChanged(newVal: string) {
        setDisableSave(newVal === accountDetails?.surname)
        setSurname(newVal)
    }



    function saveAccountDetails() {
        accountDetailsService.updateAccountDetails(firstName, surname)
            .then(value => {
                handleResponseAndNotify(value)

                getAccountDetails()
            }).catch(reason => handleError(reason))
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
                            <div className={'field'}>
                                <input
                                    value={
                                        firstName}
                                    type={'text'}
                                    placeholder={accountDetails?.firstName}
                                    onChange={(ev) => firstNameChanged(ev.currentTarget.value)}/></div>
                        </div>
                        <div className={'labeled-field'}>
                            <label>Surname</label>
                            <div className={'field'}>
                                <input
                                    value={
                                        surname}
                                    type={'text'}
                                    placeholder={accountDetails?.surname}
                                    onChange={(ev) => surnameChanged(ev.currentTarget.value)}/></div>
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
                        <input className={'inputButton'} type='submit' value={'Save Account Details'}
                               onClick={saveAccountDetails} disabled={disableSave}/>
                    </div>
                </CenteredFlex>
            </MTSectionBody>
        </MTSectionWithControls>


    )
}

export default AccountDetailsComponent