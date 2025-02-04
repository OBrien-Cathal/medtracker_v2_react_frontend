
import MTSectionWithControls from "../components/MTSectionWithControls.tsx";

import {MTPage, MTPageHeading, MTPageContent, MTPageBody} from "../components/pages/MTPage.tsx";
import CenteredFlex from "../components/layout/CenteredFlex.tsx";

const AboutPage = () => {

    return (
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        About
                    </MTPageHeading>
                }
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <CenteredFlex>
                        <div>
                            <p>This app was developed by Cathal O'Brien as a playground and demo project while learning
                                the
                                Spring
                                Boot
                                and React Frameworks.</p>
                            <p>The app registers users and allows for tracking of prescribed medications and biometric
                                measurements
                                to track the effects.</p>
                            <br/>
                            <div>

                                <p>Users can sign up and request a role to unlock different sets of functionality</p>
                                <p>The available roles are</p>
                                <ul>
                                    <li>Patient</li>
                                    <li>Practitioner</li>
                                    <li>Admin</li>
                                </ul>
                            </div>
                        </div>
                    </CenteredFlex>
                </MTPageContent>
            </MTPageBody>
        </MTPage>
    )
}

export default AboutPage