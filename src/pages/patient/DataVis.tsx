import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import SystoleGraph from "../components/graphs/SystoleGraph.tsx";
import {DosesService} from "../../service/dosesService.tsx";
import DoseGraph from "../components/graphs/DoseGraph.tsx";
import {MTPage, MTPageHeading, MTPageBody, MTPageContent, MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {useState} from "react";

import DateRangeWidget from "../../components/date/DateRangeWidget.tsx";
import {IDateRange} from "../../types/generic.type.ts";
import {todayString, todayStringAdjusted} from "../../date-utils.ts";


const DataVis = () => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const dosesService = new DosesService(token)
    const patientId: bigint = -1n
    const [dateRange, setDateRange] = useState<IDateRange>({start: todayStringAdjusted(-7), end: todayString()})

    return (

        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>

                        Data Visualizations
                    </MTPageHeading>
                }
                mtDescription={
                    <MTPageDescription>
                        <p>Graphs based on accumulated data</p>
                    </MTPageDescription>}
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <DateRangeWidget dateRange={dateRange} updateRange={setDateRange}/>
                    <SystoleGraph
                        patientIdOrNegative={patientId}
                        bloodPressureService={bloodPressureService}
                        dateRange={dateRange}/>
                    <DoseGraph
                        patientIdOrNegative={patientId}
                        dosesService={dosesService}
                        dateRange={dateRange}/>

                </MTPageContent>
            </MTPageBody>
        </MTPage>
    )
}

export default DataVis