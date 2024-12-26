import {Navigate, useLocation} from "react-router-dom";
import Swal from 'sweetalert2';
import {useAuth} from "../auth/AuthProvider.tsx";

const RequireAuth = (children: any) => {
    const location = useLocation();
    const {isLoggedIn,currentRole} = useAuth()

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }
        if (children.userroles) {
            if (children.userroles.includes(currentRole)) {
                return children.children
            } else {
                Swal.fire('Access Denied !', "", 'warning')
                return <Navigate to="/"/>
            }
        } else {
            return children.children
        }
}
export default RequireAuth