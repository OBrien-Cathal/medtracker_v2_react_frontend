import {useEffect, useState} from "preact/compat";
import {BloodPressureService} from "../../../service/bloodPressure.service.tsx";
import {IGraphData} from "../../../types/generic-graph-data.type.ts";
import LineGraph from "./LineGraph.tsx";
import SectionComponentWithDescription from "../../../components/SectionComponentWithDescription.tsx";

type PropsType = {
    patientIdOrNegative: bigint
    bloodPressureService: BloodPressureService
}

const SystoleGraph = ({patientIdOrNegative, bloodPressureService}: PropsType) => {
    const [data, setData] = useState<IGraphData>()

    function getGraphData() {
        console.log("Received PATIENT SYSTOLE graph data ID: " + patientIdOrNegative)
        bloodPressureService.getSystoleGraphDataForId(patientIdOrNegative)
            .then(r => {

                console.log("Received SYSTOLE DOSE graph data ID: " + patientIdOrNegative)
                console.log(data)
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
            {data &&
                <SectionComponentWithDescription
                    heading={'Systole'}
                    description={<p>Systole value represents blood pressure at the moment of the heartbeat. </p>}
                    content={
                        <LineGraph {...data}/>
                    }/>
            }
        </div>
    )
}

export default SystoleGraph