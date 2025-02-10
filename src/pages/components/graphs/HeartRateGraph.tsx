import {useEffect, useState} from "preact/compat";
import {BloodPressureService} from "../../../service/bloodPressure.service.tsx";
import {IGraphData, IGraphProps} from "../../../types/generic-graph-data.type.ts";
import LineGraph from "./LineGraph.tsx";
import {handleError, handleResponse} from "../../utils/response-handler.tsx";


interface Props extends IGraphProps {
    bloodPressureService: BloodPressureService
}

const HeartRateGraph = ({patientIdOrNegative, bloodPressureService, dateRange}: Props) => {
    const [data, setData] = useState<IGraphData>()

    function getGraphData() {
        console.log("Received PATIENT HeartRate graph data ID: " + patientIdOrNegative)
        bloodPressureService.getHeartRateGraphDataForId(patientIdOrNegative, dateRange)
            .then(r => {

                console.log("Received HeartRate DOSE graph data ID: " + patientIdOrNegative)
                console.log(r)
                handleResponse(r)
                setData(r.data.graphData)
            }).catch((reason) => {
            console.log(reason)
            handleError(reason)
        });
    }

    useEffect(() => {
        getGraphData();
    }, [dateRange])

    return (
        <div>
            {
                data && <LineGraph
                    graphData={data}
                    title={'Heart Rate'}
                    descriptionText={'Heart rate value represents the amount of beats per minute at the time of the reading.'}
                />
            }
        </div>
    )
}

export default HeartRateGraph