import {NavLink} from "react-router-dom";
import authenticationManager from "../auth/authenticationManager.tsx";

const UserStatus = (props: any) => {

    if (props.isLoggedIn) {
        return (
            <div className="UserStatus">
                <NavLink to="/accountManagement" title="Account management">{authenticationManager.getLoggedInUser().username}</NavLink>
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