import {useEffect, createContext, ReactNode, useContext, useState} from "preact/compat";
import authenticationDataService from "../service/authentication.service.tsx";


type Props = {
    children?: ReactNode;
}
type LoginType = {
    username: string;
    token: string;
    currentRole: string;
}

interface ProviderProps {
    user: string | null,
    token: string,
    currentRole: string,
    isLoggedIn: boolean,

    login(data: LoginType): void,

    logout(): void,
}

const ppInitial: ProviderProps = {
    user: null,
    token: '',
    currentRole: 'ANON',
    isLoggedIn: false,
    login() {
    },
    logout() {
    }
}

const AuthContext = createContext<ProviderProps>(ppInitial);

const AuthProvider = ({children}: Props) => {
    const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
    const [user, setUser] = useState<string | null>(storedInfo?.email)
    const [token, setToken] = useState(storedInfo?.token || '')
    const [currentRole, setCurrentRole] = useState(storedInfo?.currentRole || '')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = (data: LoginType) => {
        const obj = {...data}
        setUser(data.username)
        setToken(data.token)
        setCurrentRole(data.currentRole)
        setIsLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(obj))
    }

    const logout = () => {
        setUser(ppInitial.user)
        setToken(ppInitial.token)
        setCurrentRole(ppInitial.currentRole)
        setIsLoggedIn(false)
        localStorage.removeItem('user')
    }

    useEffect(() => {
        {
            if (!(token === ''))
                authenticationDataService.verifyAuthentication({token: token})
                    .then(value => {
                        if (value.data.authenticated) {
                            login(storedInfo)
                        } else {
                            logout()
                        }
                    }).catch((r) => {
                    console.log(r.error.message)
                });
        }
    })
    return <AuthContext.Provider
        value={{user, token, currentRole, isLoggedIn, logout, login,}}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext)
}

