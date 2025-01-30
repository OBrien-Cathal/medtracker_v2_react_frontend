import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import SystoleGraph from "../components/graphs/SystoleGraph.tsx";
import {DosesService} from "../../service/dosesService.tsx";
import DoseGraph from "../components/graphs/DoseGraph.tsx";
import SectionComponentWithDescription from "../../components/SectionComponentWithDescription.tsx";

const DataVis = () => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const dosesService = new DosesService(token)
    const patientId: bigint = -1n
    return (
        <div className="mainContainer">
            <div className="graphsContainer">
                <SectionComponentWithDescription
                    heading={
                        <div className={'titleContainer'}>
                            <div>Data Visualizations</div>
                        </div>
                    }
                    description={<p>Graphs based on accumulated data</p>}
                    content={
                        <div>
                            <SystoleGraph patientIdOrNegative={patientId} bloodPressureService={bloodPressureService}/>
                            <DoseGraph patientIdOrNegative={patientId} dosesService={dosesService}/>
                        </div>
                    }/>
            </div>
        </div>
    )
}

export default DataVis