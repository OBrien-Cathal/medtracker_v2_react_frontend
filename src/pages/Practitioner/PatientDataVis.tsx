import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import SystoleGraph from "../components/graphs/SystoleGraph.tsx";
import DoseGraph from "../components/graphs/DoseGraph.tsx";
import {DosesService} from "../../service/dosesService.tsx";
import {
    MTSectionBody,
    MTSectionContent, MTSectionDescription,
    MTSectionGroupHeading,

} from "../../components/section/MTSection.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {useState} from "react";

import DateRangeWidget from "../../components/date/DateRangeWidget.tsx";
import {IDateRange} from "../../types/generic.type.ts";
import {todayString, todayStringAdjusted} from "../../date-utils.ts";
import DiastoleGraph from "../components/graphs/DiastoleGraph.tsx";
import HeartRateGraph from "../components/graphs/HeartRateGraph.tsx";


type PropsType = {
    patientId: bigint
}

const PatientDataVis = ({patientId}: PropsType) => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const dosesService = new DosesService(token)
    const [dateRange, setDateRange] = useState<IDateRange>({start: todayStringAdjusted(-30), end: todayString()})
    return (
        <MTSectionWithControls
            mtHeading={
                <MTSectionGroupHeading>
                    Data Visualizations
                </MTSectionGroupHeading>
            }
            mtDescription={
                <MTSectionDescription>
                    <p>Graphs based on accumulated data</p>
                </MTSectionDescription>
            }
        >
            <MTSectionBody>
                <MTSectionContent>
                    <DateRangeWidget dateRange={dateRange} updateRange={setDateRange}/>
                    <SystoleGraph
                        patientIdOrNegative={patientId}
                        bloodPressureService={bloodPressureService}
                        dateRange={dateRange}/>
                    <DiastoleGraph
                        patientIdOrNegative={patientId}
                        bloodPressureService={bloodPressureService}
                        dateRange={dateRange}/>
                    <HeartRateGraph
                        patientIdOrNegative={patientId}
                        bloodPressureService={bloodPressureService}
                        dateRange={dateRange}/>
                    <DoseGraph
                        patientIdOrNegative={patientId}
                        dosesService={dosesService}
                        dateRange={dateRange}/>
                </MTSectionContent>
            </MTSectionBody>
        </MTSectionWithControls>

    )
}
export default PatientDataVis