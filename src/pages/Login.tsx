import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import authenticationDataService from "../service/authentication.service.tsx"
import {useAuth} from "../auth/AuthProvider.tsx";
import Swal from "sweetalert2";
import {MTPage, MTPageBody, MTPageContent} from "../components/pages/MTPage.tsx";

import CenteredFlex from "../components/layout/CenteredFlex.tsx";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const auth = useAuth()
    const navigate = useNavigate()

    // Log in a user using email and password
    const signIn = () => {
        authenticationDataService.signIn({username: username, password: password})
            .then((r) => {
                if (r.data.message === 'success') {
                    auth.login({username: username, token: r.data.token, currentRole: r.data.currentUserRole})
                    navigate('/home')
                } else {
                    Swal.fire({
                        title: "Sign in failed",
                        text: r.data.message,
                        icon: "error"
                    }).then();
                }
            }).catch(reason => {
            Swal.fire({
                title: "Sign In failed",
                text: reason.response.data.message,
                icon: "error"
            }).then();
        })
    }

    function onClickRegister() {
        navigate('/register')
    }

    const onButtonClick = (e: any) => {
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
        signIn()
    }


    return (
        <MTPage>
            <MTPageBody>
                <MTPageContent>
                    <div className={'titleContainer'}>
                        <div>
                            Sign In
                        </div>
                    </div>
                    <CenteredFlex>
                        <p>
                            <text>
                                Sign in below or
                            </text>
                            <span> </span>
                            <text className={"clickable-text"} onClick={onClickRegister}>
                                register a new account.
                            </text>
                        </p>
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
                                    autoComplete="off"
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
                    </CenteredFlex>

                </MTPageContent>
            </MTPageBody>
        </MTPage>


    )
}

export default Login