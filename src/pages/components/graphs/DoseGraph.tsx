import {useEffect, useState} from "preact/compat";
import {IGraphData, IGraphProps} from "../../../types/generic-graph-data.type.ts";
import LineGraph from "./LineGraph.tsx";
import {DosesService} from "../../../service/dosesService.tsx";
import {handleError, handleResponse} from "../../utils/response-handler.tsx";


interface Props extends IGraphProps {
    dosesService: DosesService
}

const DoseGraph = ({patientIdOrNegative, dosesService, dateRange}: Props) => {
    const [data, setData] = useState<IGraphData>()

    function getGraphData() {
        console.log("Request PATIENT DOSE graph data ID: " + patientIdOrNegative)
        dosesService.getDoseGraphDataForId(patientIdOrNegative, dateRange)
            .then(r => {
                console.log("Received PATIENT DOSE graph data ID: " + patientIdOrNegative)
                console.log(r)
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
                    title={'Dose'}
                    descriptionText={'Shows the dose(mg) of medication based on active prescriptions at a point in time.'}
                />
            }
        </div>

    )
}

export default DoseGraph