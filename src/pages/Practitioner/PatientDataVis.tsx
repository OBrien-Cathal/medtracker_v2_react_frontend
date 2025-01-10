import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import SystoleGraph from "../components/graphs/SystoleGraph.tsx";

type PropsType = {
    patientId: bigint
}

const PatientDataVis = ({patientId}:PropsType) => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)

    return (
        <div className="graphsContainer">
            <SystoleGraph patientIdOrNegative={patientId} bloodPressureService={bloodPressureService}/>
        </div>
    )
}
export default PatientDataVis