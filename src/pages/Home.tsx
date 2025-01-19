import {useNavigate} from 'react-router-dom'
import {useState} from "preact/compat";
import {useAuth} from "../auth/AuthProvider.tsx";

const Home = () => {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const {user, isLoggedIn, logout, currentRole} = useAuth()

    const needsExplanation = currentRole === "USER"
    if (isLoggedIn) {
        setUsername(user ? user : '')
    }

    const onButtonClick = () => {
        if (isLoggedIn) {
            logout()
            setUsername('')
        } else {
            navigate('/login')
        }
    }
    const onRegisterPatientClick = () => {
        navigate('/practitioners')

    }
    const onUpgradeAccountClick = () => {

        navigate('/accountManagement')

    }

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome to Medtracker!</div>
            </div>
            <br/>
            <div>
                <p>This app was developed by Cathal O'Brien as a playground and demo project while learning the Spring
                    Boot
                    and React Frameworks.</p>
                <p>The app registers users and allows for tracking of prescribed medications and biometric measurements to track the effects.</p>
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
            <br/>
            {needsExplanation && (<div className={'explanationContainer'}>
                <p>
                    Newly created accounts have minimal functionality,
                    to unlock more features you will need to upgrade your account.
                </p>
                <p> either via
                    <span> </span>
                    <text className={"clickable"} onClick={onUpgradeAccountClick}>
                        Account Management,
                    </text>
                    <span> </span>
                    or by
                    <span> </span>
                    <text className={"clickable"} onClick={onRegisterPatientClick}>
                        Registering with a Practitioner
                    </text>
                </p>

            </div>)}
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onButtonClick}
                    value={isLoggedIn ? 'Log out' : 'Log in'}
                />
                {isLoggedIn ? <div>Your email address is {username}</div> : <div/>}
            </div>
        </div>
    )


}

export default Home