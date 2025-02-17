import {useEffect, useState} from "preact/compat";
import {BloodPressureService} from "../../../service/bloodPressure.service.tsx";
import {IGraphData, IGraphProps} from "../../../types/generic-graph-data.type.ts";
import LineGraph from "./LineGraph.tsx";
import {handleError, handleResponse} from "../../utils/response-handler.tsx";


interface Props extends IGraphProps {
    bloodPressureService: BloodPressureService
}

const SystoleGraph = ({patientIdOrNegative, bloodPressureService, dateRange}: Props) => {
    const [data, setData] = useState<IGraphData>()

    function getGraphData() {
        // console.log("Received PATIENT SYSTOLE graph data ID: " + patientIdOrNegative)
        bloodPressureService.getSystoleGraphDataForId(patientIdOrNegative, dateRange)
            .then(r => {

                // console.log("Received SYSTOLE DOSE graph data ID: " + patientIdOrNegative)
                // console.log(r)
                handleResponse(r)
                setData(r.data.graphData)
            }).catch((reason) => {
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
                    title={'Systole'}
                    descriptionText={'Systole value represents blood pressure at the moment of the heartbeat.'}
                />
            }
        </div>
    )
}

export default SystoleGraph