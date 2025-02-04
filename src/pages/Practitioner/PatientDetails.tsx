import {useAuth} from "../../auth/AuthProvider.tsx";
import {useParams} from "react-router-dom";
import UserDetails from "../components/UserDetails.tsx";
import {IParams} from "../../types/params.type.ts";
import PatientDataVis from "./PatientDataVis.tsx";
import PrescriptionsComponent from "../patient_practitioner/PrescriptionsComponent.tsx";
import {MTPage, MTPageBody, MTPageContent, MTPageDescription, MTPageHeading} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {
    MTSectionBody,
    MTSectionContent,
    MTSectionGroupHeading,
    MTSectionHeading
} from "../../components/section/MTSection.tsx";

const PatientDetails = () => {
    const {token} = useAuth()


    const params = useParams<IParams>()
    const patientId = Number(params.id)

    return (

        <MTPage>

            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        <div>Patient {patientId}</div>
                    </MTPageHeading>}
                mtDescription={
                    <MTPageDescription>
                        <p>Overview of all records for a patient</p>
                    </MTPageDescription>
                }/>


            <MTPageBody>
                <MTPageContent>

                    <MTSectionWithControls mtHeading={
                        <MTSectionGroupHeading>
                            Patient Information
                        </MTSectionGroupHeading>
                    }>
                        <MTSectionBody>
                            <UserDetails/>
                            <MTSectionContent>
                                <MTSectionWithControls
                                    mtHeading={
                                        <MTSectionHeading>
                                            Medical Records
                                        </MTSectionHeading>
                                    }

                                    mtDescription={
                                        <MTPageDescription>
                                            <p>Details about a patients medical records</p>
                                        </MTPageDescription>
                                    }>
                                    <MTSectionBody>
                                        Under construction
                                    </MTSectionBody>
                                </MTSectionWithControls>
                            </MTSectionContent>
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