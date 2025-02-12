import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import authenticationDataService from "../service/authentication.service.tsx"
import {MTPage, MTPageBody, MTPageContent} from "../components/pages/MTPage.tsx";
import CenteredFlex from "../components/layout/CenteredFlex.tsx";
import { handleResponseAndNotify} from "./utils/response-handler.tsx";
import Swal from "sweetalert2";

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')

    const navigate = useNavigate()


    const signUp = () => {
        authenticationDataService.signUp({username: username, password: password})
            .then((r) => {
                handleResponseAndNotify(r)
                navigate('/login')
            }).catch(reason => {
            console.log(reason)
            Swal.fire({
                title: "Sign up failed",
                text: reason.response.data.message,
                icon: "error"
            }).then();
        })
    }

    const onButtonClick = (e: any) => {
        e.preventDefault()
        // Set initial error values to empty
        setUsernameError('')
        setPasswordError('')
        setRepeatPasswordError('')

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

        if ('' === repeatPassword) {
            setPasswordError('Please repeat your password')
            return
        }

        if (repeatPassword != password) {
            setPasswordError('passwords do not match')
            setRepeatPasswordError('passwords do not match')
            return
        }
        signUp()
    }


    return (


        <MTPage>
            <MTPageBody>
                <MTPageContent>
                    <div className={'titleContainer'}>
                        <div>
                            Register
                        </div>
                    </div>

                    <CenteredFlex>
                        <p>
                            <text>
                                Fill in your email and password below to register a new account
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
                            <div className={'inputContainer'}>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    value={repeatPassword}
                                    placeholder="Repeat password"
                                    onChange={(ev) => setRepeatPassword(ev.currentTarget.value)}
                                    className={'inputBox'}
                                />
                                <label className="errorLabel">{repeatPasswordError}</label>
                            </div>
                            <br/>
                            <div className={'buttonContainer'}>
                                <input className={'inputButton'} type='submit' value={'Register'}/>
                            </div>

                        </form>
                    </CenteredFlex>

                </MTPageContent>
            </MTPageBody>
        </MTPage>


    )
}

export default Register