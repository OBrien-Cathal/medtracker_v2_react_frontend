import {useNavigate} from 'react-router-dom'
import {useState} from "preact/compat";
import {useAuth} from "../auth/AuthProvider.tsx";
import SectionComponent from "../components/SectionComponent.tsx";

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

    return (
        <div className="mainContainer">
            <SectionComponent
                heading={
                    <div className={'titleContainer'}>
                        <div>Med Tracker</div>
                    </div>
                }

                content={
                    <div>

                        <div className={'titleContainer'}>
                            <div>Welcome to Med Tracker!</div>
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

                            {isLoggedIn ? <div>Signed in successfully as {username}</div> : <div/>}
                        </div>
                    </div>
                }/>


        </div>
    )


}

export default Home