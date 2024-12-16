import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import authenticationDataService from "./service/authentication.service"

const Login = (props: any) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()


    const checkAccountExists = (callback: any) => {
        authenticationDataService.checkAccountExists({username: username, password: ""})
            .then((r) => {
                console.log(r)
                callback(r.data?.accountExists)
            }).catch((r) => {
            window.alert(r.error.message)
        })
    }

    // Log in a user using email and password
    const signIn = () => {
        authenticationDataService.signIn({username: username, password: password})
            .then((r) => {
                console.log(r)
                if ('success' === r.data.message) {
                    localStorage.setItem('user', JSON.stringify({username, token: r.data.token}))
                    props.setLoggedIn(true)
                    props.setUsername(username)
                    navigate('/')
                } else {
                    window.alert('Wrong email or password')
                }
            }).catch(reason => {console.log(reason.message)})
    }

    const signUp = () => {
        authenticationDataService.signUp({username: username, password: password})
            .then((r) => {
                console.log(r)
                if ('success' === r.data.message) {
                    localStorage.setItem('user', JSON.stringify({username, token: r.data.token}))
                    props.setLoggedIn(true)
                    props.setUsername(username)
                    navigate('/')
                } else {
                    window.alert('Sign Up Failed!')
                }
            }).catch(reason => {console.log(reason.message)})
    }

    const onButtonClick = () => {
        // Set initial error values to empty
        setUsernameError('')
        setPasswordError('')

        // Check if the user has entered both fields correctly
        if ('' === username) {
            setUsernameError('Please enter your email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)) {
            setUsernameError('Please enter a valid email')
            return
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
            return
        }

        // if (password.length < 7) {
        //   setPasswordError('The password must be 8 characters or longer')
        //   return
        // }

        // Authentication calls will be made here...

        signIn()
        checkAccountExists((accountExists: any) => {
            // If yes, log in
            if (accountExists) signIn()
            // Else, ask user if they want to create a new account and if yes, then log in
            else if (
                window.confirm(
                    'An account does not exist with this username: ' +
                    username +
                    '. Do you want to create a new account?',
                )
            ) {
                signUp()
            }
        })
    }


    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <br/>
            <div className={'inputContainer'}>
                <input
                    value={username}
                    placeholder="Enter your email here"
                    onChange={(ev) => setUsername(ev.currentTarget.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{usernameError}</label>
            </div>
            <br/>
            <div className={'inputContainer'}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.currentTarget.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br/>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'}/>
            </div>
        </div>
    )
}

export default Login