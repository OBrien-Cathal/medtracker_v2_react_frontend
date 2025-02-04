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


type PropsType = {
    patientId: bigint
}

const PatientDataVis = ({patientId}: PropsType) => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const dosesService = new DosesService(token)

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
                    <SystoleGraph patientIdOrNegative={patientId} bloodPressureService={bloodPressureService}/>
                    <DoseGraph patientIdOrNegative={patientId} dosesService={dosesService}/>
                </MTSectionContent>
            </MTSectionBody>
        </MTSectionWithControls>

    )
}
export default PatientDataVis