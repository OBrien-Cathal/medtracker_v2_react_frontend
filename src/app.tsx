import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './home'
import Login from './login'
import {useState, useEffect} from 'preact/hooks'
import './app.css'
import authenticationDataService from "./service/authentication.service"
import {IAuthenticatedUser} from "./types/authentication.type.tsx";


export function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(() => {
        let userStr = localStorage.getItem('user')
        console.log(userStr)
        if (!userStr) {
            setLoggedIn(false)
            return
        }

        function getCurrentUser(userOrNull: string | null): IAuthenticatedUser {
            if (userOrNull) {
                return JSON.parse(userOrNull)
            } else {
                return {username: "", token: ""}
            }
        }

        let user = getCurrentUser(userStr);
        authenticationDataService.verifyAuthentication({token: user.token})
            .then(value => {
                console.log(value)
                setLoggedIn(value.data.authenticated)
                setUsername(user.username)
            }).catch((r) => {
            console.log(r.error.message)
        });
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
                    />
                    <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default App