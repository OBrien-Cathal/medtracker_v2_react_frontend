import {useEffect, useState} from "preact/compat";
import {BloodPressureService} from "../../../service/bloodPressure.service.tsx";
import {IGraphData} from "../../../types/generic-graph-data.type.ts";
import LineGraph from "./LineGraph.tsx";

type PropsType = {
    patientIdOrNegative: bigint
    bloodPressureService: BloodPressureService
}

const SystoleGraph = ({patientIdOrNegative, bloodPressureService}: PropsType) => {
    const [data, setData] = useState<IGraphData>()

    function getGraphData() {
        console.log("Request PATIENT graph data ID: " + patientIdOrNegative)
        bloodPressureService.getSystoleGraphDataForId(patientIdOrNegative)
            .then(r => {
                console.log("Received PATIENT graph data")
                setData(r.data.graphData)
            }).catch((reason) => {
            console.log(reason)
        });
    }

    useEffect(() => {
        getGraphData();
    }, [])

    return (
        <div>
            {
                data &&
                <LineGraph {...data}/>
            }
        </div>
    )
}

export default SystoleGraph