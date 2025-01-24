import {useAuth} from "../../auth/AuthProvider.tsx";
import {useParams} from "react-router-dom";
import UserDetails from "../components/UserDetails.tsx";
import {IParams} from "../../types/params.type.ts";
import PatientDataVis from "./PatientDataVis.tsx";
import MaxWidthSection from "../../components/MaxWidthSection.tsx";
import SectionComponentWithDescription from "../../components/SectionComponentWithDescription.tsx";
import PrescriptionsComponent from "../patient_practitioner/PrescriptionsComponent.tsx";

const PatientDetails = () => {
    const {token} = useAuth()


    const params = useParams<IParams>()
    const patientId = Number(params.id)

    return (
        <div className="mainContainer">

            <div className={'titleContainer'}>
                <div>Patient: {patientId}</div>
            </div>


            <br/>
            <MaxWidthSection content={
                <div>
                    <SectionComponentWithDescription
                        heading={<div>
                            Patient: {patientId} Details
                        </div>}
                        description={
                            <div>
                                <p>Basic details about a patient</p>
                            </div>
                        }
                        content={
                            <div className={'center-section-body'}>
                                <UserDetails></UserDetails>
                            </div>
                        }/>
                    <br/>
                    <SectionComponentWithDescription
                        heading={'Medical Records'}
                        description={
                            <div>
                                <p>Details about a patients medical records</p>
                            </div>
                        }
                        content={
                            <div className={'center-section-body'}>
                                Patient Detail here
                            </div>
                        }/>
                    <br/>
                    <PrescriptionsComponent token={token} patientId={patientId}></PrescriptionsComponent>
                </div>

            }/>

            <br/>
            <PatientDataVis patientId={(params.id as unknown as bigint)}/>
        </div>
    )
}

export default PatientDetails