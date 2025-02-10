import {useEffect, useState} from "preact/compat";
import {BloodPressureService} from "../../../service/bloodPressure.service.tsx";
import {IGraphData, IGraphProps} from "../../../types/generic-graph-data.type.ts";
import LineGraph from "./LineGraph.tsx";
import {handleError, handleResponse} from "../../utils/response-handler.tsx";


interface Props extends IGraphProps {
    bloodPressureService: BloodPressureService
}

const DiastoleGraph = ({patientIdOrNegative, bloodPressureService, dateRange}: Props) => {
    const [data, setData] = useState<IGraphData>()

    function getGraphData() {
        console.log("Received PATIENT Diastole graph data ID: " + patientIdOrNegative)
        bloodPressureService.getDiastoleGraphDataForId(patientIdOrNegative, dateRange)
            .then(r => {

                console.log("Received Diastole DOSE graph data ID: " + patientIdOrNegative)
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
                    title={'Diastole'}
                    descriptionText={'Diastole value represents blood pressure in between heart beats.'}
                />
            }
        </div>
    )
}

export default DiastoleGraph