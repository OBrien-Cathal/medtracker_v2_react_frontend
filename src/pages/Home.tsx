import {useNavigate} from 'react-router-dom'
import {useState} from "preact/compat";
import {useAuth} from "../auth/AuthProvider.tsx";
import {MTPage, MTPageHeading, MTPageContent, MTPageBody} from "../components/pages/MTPage.tsx";
import MTSectionWithControls from "../components/MTSectionWithControls.tsx";
import CenteredFlex from "../components/layout/CenteredFlex.tsx";


const Home = () => {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const {user, isLoggedIn, currentRole} = useAuth()

    const needsExplanation = currentRole === "USER"
    if (isLoggedIn) {
        setUsername(user ? user : '')
    }


    const onRegisterPatientClick = () => {
        navigate('/practitioners')

    }
    const onUpgradeAccountClick = () => {

        navigate('/accountManagement')

    }


    const onSignInClicked = () => {
        navigate('/login')

    }
    const onRegisterClicked = () => {

        navigate('/register')

    }

    return (
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        Med Tracker
                    </MTPageHeading>
                }
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <CenteredFlex>
                        <div className={'titleContainer'}>
                            <div>Welcome to Med Tracker!</div>
                        </div>
                        <br/>
                        {!isLoggedIn && <div>
                            <p>

                                <text className={"clickable-text"} onClick={onSignInClicked}>
                                    Sign in
                                </text>
                                <span> </span>
                                or
                                <span> </span>
                                <text className={"clickable-text"} onClick={onRegisterClicked}>
                                    Register
                                </text>
                            </p>

                        </div>}

                        {needsExplanation && (<div>
                            <p>
                                Newly created accounts have minimal functionality,
                                to unlock more features you will need to upgrade your account.
                            </p>
                            <p> either via
                                <span> </span>
                                <text className={"clickable-text"} onClick={onUpgradeAccountClick}>
                                    Account Management,
                                </text>
                                <span> </span>
                                or by
                                <span> </span>
                                <text className={"clickable-text"} onClick={onRegisterPatientClick}>
                                    Registering with a Practitioner
                                </text>
                            </p>

                        </div>)}
                        <div className={'buttonContainer'}>

                            {isLoggedIn ? <div>Signed in successfully as {username}</div> : <div/>}
                        </div>
                        <div>
                            <p>
                                Test users are available and can be used to explore functionality. All users have the same
                                password: "abc'.
                            </p>
                            <ul>
                                <li>
                                    admin@medtracker.com
                                </li>
                                <li>
                                    doc1@medtracker.com
                                </li>
                                <li>
                                    patient1@medtracker.com
                                </li>

                            </ul>
                        </div>
                    </CenteredFlex>

                </MTPageContent>
            </MTPageBody>
        </MTPage>

    )
}

export default Home