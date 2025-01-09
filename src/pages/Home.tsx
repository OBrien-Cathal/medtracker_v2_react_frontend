import {useNavigate} from 'react-router-dom'
import {useState} from "preact/compat";
import {useAuth} from "../auth/AuthProvider.tsx";

const Home = () => {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const {user, isLoggedIn, logout, currentRole} = useAuth()
    // const [viewInstructions, setViewInstrictions]
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
            <div>This is the home page.</div>
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