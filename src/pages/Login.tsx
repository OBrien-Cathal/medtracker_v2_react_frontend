import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import authenticationDataService from "../service/authentication.service.tsx"
import {useAuth} from "../auth/AuthProvider.tsx";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const auth = useAuth()
    const navigate = useNavigate()


    const checkAccountExists = (callback: any) => {
        authenticationDataService.checkAccountExists({username: username, password: ""})
            .then((r) => {
                callback(r.data?.accountExists)
            }).catch((r) => {
            window.alert(r.error.message)
        })
    }

    // Log in a user using email and password
    const signIn = () => {
        authenticationDataService.signIn({username: username, password: password})
            .then((r) => {
                if (r.data.message === 'success') {
                    auth.login({username: username, token: r.data.token, currentRole: r.data.currentUserRole})
                    navigate('/home')
                } else {
                    window.alert('Wrong email or password')
                }
            }).catch(reason => {
            console.log(reason.message)
        })
    }

    const signUp = () => {
        authenticationDataService.signUp({username: username, password: password})
            .then((r) => {
                if (r.data.message === 'success') {
                    auth.login({username: username, token: r.data.token, currentRole: r.data.currentUserRole})
                    navigate('/home')
                } else {
                    window.alert('Sign Up Failed!')
                }
            }).catch(reason => {
            console.log(reason.message)
        })
    }

    const onButtonClick = (e:any) => {
        e.preventDefault()
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


        checkAccountExists((accountExists: boolean) => {
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
                <div>
                    Sign In
                </div>
            </div>
            <p>Sign in or register a new account here</p>
            <br/>
            <form onSubmit={onButtonClick}>
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
                        type="password"
                        autocomplete="off"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.currentTarget.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br/>
                <div className={'buttonContainer'}>
                    <input className={'inputButton'} type='submit' value={'Log in'}/>
                </div>
            </form>
        </div>
    )
}

export default Login