import {useAuth} from "../../auth/AuthProvider.tsx";
import PrescriptionsComponent from "../patient_practitioner/PrescriptionsComponent.tsx";

const Prescriptions = () => {
    const {token} = useAuth()


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Prescriptions</div>
            </div>

            <div>
                <PrescriptionsComponent
                    token={token}
                    patientId={null}
                   >
                </PrescriptionsComponent>
            </div>


        </div>
    )
}

export default Prescriptions