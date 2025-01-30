import SectionComponent from "../components/SectionComponent.tsx";

const AboutPage = () => {

    return (
        <div className="mainContainer">

            <SectionComponent
                heading={
                    <div className={'titleContainer'}>
                        <div>About</div>
                    </div>
                }

                content={
                    <div>
                        <p>This app was developed by Cathal O'Brien as a playground and demo project while learning the
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
                }/>


        </div>
    )
}

export default AboutPage