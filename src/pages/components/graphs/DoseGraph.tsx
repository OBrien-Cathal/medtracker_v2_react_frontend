import {useEffect, useState} from "preact/compat";
import {IGraphData} from "../../../types/generic-graph-data.type.ts";
import LineGraph from "./LineGraph.tsx";
import {DosesService} from "../../../service/dosesService.tsx";

type PropsType = {
    patientIdOrNegative: bigint
    dosesService: DosesService
}

const DoseGraph = ({patientIdOrNegative, dosesService}: PropsType) => {
    const [data, setData] = useState<IGraphData>()

    function getGraphData() {
        // console.log("Request PATIENT DOSE graph data ID: " + patientIdOrNegative)
        dosesService.getDoseGraphDataForId(patientIdOrNegative)
            .then(r => {
                // console.log("Received PATIENT DOSE graph data ID: " + patientIdOrNegative)
                // console.log(data)
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