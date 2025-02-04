import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import SystoleGraph from "../components/graphs/SystoleGraph.tsx";
import {DosesService} from "../../service/dosesService.tsx";
import DoseGraph from "../components/graphs/DoseGraph.tsx";
import {MTPage, MTPageHeading, MTPageBody, MTPageContent, MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";


const DataVis = () => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const dosesService = new DosesService(token)
    const patientId: bigint = -1n
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
                    <SystoleGraph patientIdOrNegative={patientId}
                                  bloodPressureService={bloodPressureService}/>
                    <DoseGraph patientIdOrNegative={patientId} dosesService={dosesService}/>

                </MTPageContent>
            </MTPageBody>
        </MTPage>
    )
}

export default DataVis