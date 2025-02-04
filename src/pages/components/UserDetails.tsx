import {MTSectionBody, MTSectionHeading} from "../../components/section/MTSection.tsx";
import {MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";

const UserDetails = () => {

    return (
        <MTSectionWithControls
            mtHeading={
                <MTSectionHeading>
                    Basic Details
                </MTSectionHeading>
            }
            mtDescription={
                <MTPageDescription>
                    <p>Simple details</p>
                </MTPageDescription>
            }>
            <MTSectionBody>
                Basic info about a user, get from server.
            </MTSectionBody>
        </MTSectionWithControls>


    )
}

export default UserDetails