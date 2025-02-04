import {useAuth} from "../../auth/AuthProvider.tsx";
import PrescriptionsComponent from "../patient_practitioner/PrescriptionsComponent.tsx";
import {MTPage,MTPageHeading, MTPageBody,MTPageDescription } from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";

const Prescriptions = () => {
    const {token} = useAuth()


    return (
        <MTPage>
            <MTPageBody>

                <MTSectionWithControls
                    mtHeading={
                        <MTPageHeading>
                            <div>Prescriptions</div>
                        </MTPageHeading>}
                    mtDescription={
                        <MTPageDescription>
                            <p>Prescription information for the current patient</p>
                        </MTPageDescription>
                    }/>

                <PrescriptionsComponent
                    token={token}
                    patientId={null}>
                </PrescriptionsComponent>
            </MTPageBody>
        </MTPage>
    )
}

export default Prescriptions