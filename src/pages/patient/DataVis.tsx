import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import SystoleGraph from "../components/graphs/SystoleGraph.tsx";
import {DosesService} from "../../service/dosesService.tsx";
import DoseGraph from "../components/graphs/DoseGraph.tsx";

const DataVis = () => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const dosesService = new DosesService(token)
    const patientId: bigint = -1n
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Data</div>
            </div>
            <div className="graphsContainer">
                <div>Systole</div>
                <SystoleGraph patientIdOrNegative={patientId} bloodPressureService={bloodPressureService}/>
                <DoseGraph patientIdOrNegative={patientId} dosesService={dosesService}/>
            </div>
        </div>
    )
}

export default DataVis