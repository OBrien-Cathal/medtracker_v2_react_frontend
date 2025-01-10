import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import SystoleGraph from "../components/graphs/SystoleGraph.tsx";
import DoseGraph from "../components/graphs/DoseGraph.tsx";
import {DosesService} from "../../service/dosesService.tsx";

type PropsType = {
    patientId: bigint
}

const PatientDataVis = ({patientId}:PropsType) => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const dosesService = new DosesService(token)

    return (
        <div className="graphsContainer">
            <SystoleGraph patientIdOrNegative={patientId} bloodPressureService={bloodPressureService}/>
            <DoseGraph patientIdOrNegative={patientId} dosesService={dosesService}/>
        </div>
    )
}
export default PatientDataVis