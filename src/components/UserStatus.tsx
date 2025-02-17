import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider.tsx";
import logo from "../assets/log-out.svg";
import userIcon from "../assets/users/user-user.svg";
import patientIcon from "../assets/users/patient-user.svg";
import practitionerIcon from "../assets/users/practitioner-user.svg";
import adminIcon from "../assets/users/admin-user.svg";
import {userRoles} from "../data/userRoles.ts";

const UserStatus = () => {
    const {user, isLoggedIn, logout, currentRole} = useAuth()
    const navigate = useNavigate()
    const logoutClicked = () => {
        logout()
        navigate('/login')
    }

    if (isLoggedIn) {
        return (
            <div className="UserStatus">

                <div className={'UserStatusName'}>
                    {currentRole === userRoles.admin &&
                        <img src={adminIcon} alt="Admin User"/>}
                    {currentRole === userRoles.practitioner &&
                        <img src={practitionerIcon} alt="Practitioner User"/>}
                    {currentRole === userRoles.patient &&
                        <img src={patientIcon} alt="Patient User"/>}
                    {currentRole === userRoles.user &&
                        <img src={userIcon} alt="Limited User"/>}


                    <NavLink to="/accountManagement" title="Account management">{user}</NavLink>
                </div>

                <img className={'sign-out-button'} src={logo} alt="Sign out" onClick={logoutClicked}/>
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