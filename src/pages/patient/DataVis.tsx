import {useAuth} from "../../auth/AuthProvider.tsx";
import {useEffect, useState} from "preact/compat";

import {BloodPressureService} from "../../service/bloodPressure.service.tsx";

import {Chart} from "react-google-charts";

const DataVis = () => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const [data, setData] = useState<any[][]>()

    function getSystoleGraphData() {
        bloodPressureService.getSystoleGraphData()
            .then(r => {
                console.log("data")
                console.log(r.data.graphData)
                let tempArray: any[][] = []
                tempArray=tempArray.concat([r.data.graphData.columnNames])
                tempArray=tempArray.concat(r.data.graphData.dataRows)
                setData(tempArray)
            }).catch((reason) => {
            console.log(reason)
        });
    }

    useEffect(() => {
        getSystoleGraphData();
    }, [])


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Data</div>
            </div>
            <div>Systole</div>
            <Chart
                chartType={'LineChart'}
                data={data}
                width={"100%"}
                height={"400px"}
            >
            </Chart>
        </div>
    )
}

export default DataVis