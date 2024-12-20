import {Navigate} from "react-router-dom"
import {useLocation} from "react-router-dom";
import Swal from 'sweetalert2';
import authenticationManager from "../auth/authenticationManager";

const RequireAuth = (children: any) => {
    let currentUserRole
    const location = useLocation();

    if (!authenticationManager.isLoggedIn()) {
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }

    let user = authenticationManager.getLoggedInUser()
    currentUserRole = user.currentUserRole

    if (currentUserRole) {

        if (children.userroles) {
            if (children.userroles.includes(currentUserRole)) {
                return children.children
            } else {
                Swal.fire('Access Denied !', "", 'warning')
                return <Navigate to="/"/>
            }
        } else {
            return children.children
        }
    } else {
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }
}
export default RequireAuth