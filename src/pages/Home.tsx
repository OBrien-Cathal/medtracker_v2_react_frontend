import {useNavigate} from 'react-router-dom'
import {useState} from "preact/compat";

import authenticationManager from "../auth/authenticationManager";

const Home = (props:any) => {
    const [loggedIn, setLoggedIn] = useState(props.isLoggedIn)
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    let currentUser = authenticationManager.getLoggedInUser()

    if (authenticationManager.isLoggedIn()) {

        setUsername(currentUser.username)
        setLoggedIn(true)
    }

    const onButtonClick = () => {
        if (loggedIn) {
            authenticationManager.removeLogin()
            props.setIsLoggedIn(false)
            setLoggedIn(false)
            setUsername('')

        } else {
            navigate('/login')
        }
    }

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome to Medtracker!</div>
            </div>
            <div>This is the home page.</div>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onButtonClick}
                    value={loggedIn ? 'Log out' : 'Log in'}
                />
                {loggedIn ? <div>Your email address is {username}</div> : <div/>}
            </div>
        </div>
    )


}

export default Home