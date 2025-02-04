import {Chart} from "react-google-charts";
import {IGraphData} from "../../../types/generic-graph-data.type.ts";
import MTSectionWithControls from "../../../components/MTSectionWithControls.tsx";
import {MTSectionDescription, MTSectionHeading} from "../../../components/section/MTSection.tsx";

type PropsType = {
    graphData: IGraphData
    title: string
    descriptionText: string
}

const LineGraph = ({graphData, title, descriptionText}: PropsType) => {
    // console.log("render line graph")
    function combinedData(myGraphData: IGraphData): any[][] {
        let tempArray: any[][] = []
        tempArray = tempArray.concat([myGraphData.columnNames])
        tempArray = tempArray.concat(myGraphData.dataRows)
        return tempArray
    }

    const data: any[][] = combinedData(graphData)
    // console.log(data)

    return (
        <div className="LineGraph">
            <MTSectionWithControls
                mtHeading={
                    <MTSectionHeading>
                        {title}
                    </MTSectionHeading>}
                mtDescription={
                    <MTSectionDescription>
                        <p>{descriptionText}</p>
                    </MTSectionDescription>}
            >

                <Chart
                    chartType={'LineChart'}
                    data={data}
                    width={"100%"}
                    height={"400px"}
                >
                </Chart>
            </MTSectionWithControls>


        </div>
    )
}

export default LineGraph