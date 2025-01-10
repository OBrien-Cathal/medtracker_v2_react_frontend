import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import SystoleGraph from "../components/graphs/SystoleGraph.tsx";

const DataVis = () => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const patientId: bigint = -1n
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Data</div>
            </div>
            <div className="graphsContainer">
                <div>Systole</div>
                <SystoleGraph patientIdOrNegative={patientId} bloodPressureService={bloodPressureService}/>
            </div>
        </div>
    )
}

export default DataVis