import {useParams} from "react-router-dom";
import {IParams} from "../../types/params.type.ts";
import {MTPage, MTPageHeading, MTPageBody, MTPageContent, MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import CenteredFlex from "../../components/layout/CenteredFlex.tsx";


const MedicationDetails = () => {
    const params = useParams<IParams>()
    const id = params.id

    return (
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        Medication Details
                    </MTPageHeading>
                }
                mtDescription={
                    <MTPageDescription>
                        <p>Detailed view on a medication</p>
                    </MTPageDescription>}
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <CenteredFlex>Fill MedicationDetails here for ID: {id}</CenteredFlex>

                </MTPageContent>
            </MTPageBody>
        </MTPage>
    )
}

export default MedicationDetails