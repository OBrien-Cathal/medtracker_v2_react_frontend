import {useAuth} from "../../auth/AuthProvider.tsx";
import {useParams} from "react-router-dom";
import BasicPatientDetails from "../components/BasicPatientDetails.tsx";
import {IParams} from "../../types/params.type.ts";
import PatientDataVis from "./PatientDataVis.tsx";
import PrescriptionsComponent from "../patient_practitioner/PrescriptionsComponent.tsx";
import {MTPage, MTPageBody, MTPageContent, MTPageDescription, MTPageHeading} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {
    MTSectionBody,
    MTSectionContent,
    MTSectionGroupHeading
} from "../../components/section/MTSection.tsx";
import AccountDetailsService from "../../service/AccountDetailsService.tsx";
import {useEffect, useState} from "preact/compat";
import {IAccountDetailsType} from "../../types/account-details.type.ts";

const PatientDetails = () => {
    const {token} = useAuth()
    const params = useParams<IParams>()

    const patientId = Number(params.id)
    const accountDetailsService = new AccountDetailsService(token);
    const accountDetailsPlaceholder: IAccountDetailsType = {firstName:'',
        surname:'',email:'',userModelId:''}
    const [accountDetails, setAccountDetails] = useState<IAccountDetailsType>(accountDetailsPlaceholder)

    useEffect(() => {
        getAccountDetails()
    }, []);


    function getAccountDetails() {
        accountDetailsService.getPatientAccountDetails(params.id ? params.id : "")
            .then(value => {
                console.log(value)
                setAccountDetails(value.data)
            })
    }

    return (

        <MTPage>

            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        <div>
                            {accountDetails?.surname}, {accountDetails?.firstName} </div>
                    </MTPageHeading>}
                mtDescription={
                    <MTPageDescription>
                        <p>Overview of all records for a patient</p>
                    </MTPageDescription>
                }>


            </MTSectionWithControls>


            <MTPageBody>
                <MTPageContent>

                    <MTSectionWithControls mtHeading={
                        <MTSectionGroupHeading>
                            Patient Information
                        </MTSectionGroupHeading>
                    }>
                        <MTSectionBody>
                            <BasicPatientDetails accountDetails={accountDetails
                                }
                            />

                        </MTSectionBody>
                    </MTSectionWithControls>

                    <MTSectionWithControls mtHeading={
                        <MTSectionGroupHeading>
                            Prescriptions
                        </MTSectionGroupHeading>
                    }>
                        <MTSectionBody>
                            <MTSectionContent>

                                <PrescriptionsComponent token={token} patientId={patientId}></PrescriptionsComponent>
                            </MTSectionContent>
                        </MTSectionBody>
                    </MTSectionWithControls>


                    <br/>
                    <PatientDataVis patientId={(params.id as unknown as bigint)}/>

                </MTPageContent>


            </MTPageBody>
        </MTPage>


    )
}

export default PatientDetails