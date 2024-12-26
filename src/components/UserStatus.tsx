import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider.tsx";
import logo from "../assets/log-out.svg";

const UserStatus = () => {
    const {user, isLoggedIn, logout} = useAuth()
    const navigate = useNavigate()
    const logoutClicked = () => {
        logout()
        navigate('/login')
    }

    if (isLoggedIn) {
        return (
            <div className="UserStatus">
                <NavLink to="/accountManagement" title="Account management">{user}</NavLink>
                <img src={logo} alt="Sign out" onClick={logoutClicked}/>
            </div>
        );
    } else {
        return (
            <div className="UserStatus">
                <NavLink to="/login">Sign In</NavLink>
            </div>
        );
    }
}

export default UserStatus