import {useNavigate} from 'react-router-dom'
import {useState} from "preact/compat";
import {useAuth} from "../auth/AuthProvider.tsx";

const Home = () => {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const {user, isLoggedIn,logout} = useAuth()

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
                    value={isLoggedIn ? 'Log out' : 'Log in'}
                />
                {isLoggedIn ? <div>Your email address is {username}</div> : <div/>}
            </div>
        </div>
    )


}

export default Home