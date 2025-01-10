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
    console.log(patientIdOrNegative)
    console.log(bloodPressureService)
    console.log("render systole graph")

    function getSystoleGraphData() {
        if (patientIdOrNegative > 1) {
            console.log("Request PATIENT graph data")
            bloodPressureService.getPractitionerPatientSystoleGraphData(patientIdOrNegative)
                .then(r => {
                    console.log("Received PATIENT graph data")
                    setData(r.data.graphData)
                }).catch((reason) => {
                console.log(reason)
            });
        } else {
            console.log("Request graph data")
            bloodPressureService.getSystoleGraphData()
                .then(r => {
                    console.log("Received graph data")
                    setData(r.data.graphData)
                }).catch((reason) => {
                console.log(reason)
            });
        }
    }

    useEffect(() => {
        console.log("Systole graph use effect")
        getSystoleGraphData();
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