import {useAuth} from "../../auth/AuthProvider.tsx";
import {useEffect, useState} from "preact/compat";

import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import {IGraphData} from "../../types/generic-graph-data.type.ts";

const DataVis = () => {
    const {token} = useAuth()


    const bloodPressureService = new BloodPressureService(token)
    const [graphData, setGraphData] = useState<IGraphData>()


    function getSystoleGraphData() {
        bloodPressureService.getSystoleGraphData()
            .then(r => {
                setGraphData(r.data.graphData)
                console.log(r.data)
            }).catch((reason) => {
                console.log(reason.errors)
        });
    }

    useEffect(() => {
        getSystoleGraphData();
    }, [])


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Data</div>
            </div>
            <div>Systole</div>
            <div>GRAPH here {graphData}</div>
        </div>
    )
}

export default DataVis