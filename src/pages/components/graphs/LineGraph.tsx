import {Chart} from "react-google-charts";
import {IGraphData} from "../../../types/generic-graph-data.type.ts";


const LineGraph = (graphData: IGraphData) => {
    console.log("render line graph")
    function combinedData(myGraphData: IGraphData): any[][] {
        let tempArray: any[][] = []
        tempArray = tempArray.concat([myGraphData.columnNames])
        tempArray = tempArray.concat(myGraphData.dataRows)
        return tempArray
    }

    const data: any[][] = combinedData(graphData)
    console.log(data)

    return (
        <div className="lineGraphContainer">

                <div>
                    <Chart
                        chartType={'LineChart'}
                        data={data}
                        width={"100%"}
                        height={"400px"}
                    >
                    </Chart>

                </div>

        </div>
    )
}

export default LineGraph