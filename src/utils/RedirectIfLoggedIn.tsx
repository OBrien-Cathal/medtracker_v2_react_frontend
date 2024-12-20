import { Navigate } from "react-router-dom";
import authenticationManager from "../auth/authenticationManager.tsx";

const RedirectIfLoggedIn = (children:any)=>{
    if (authenticationManager.isLoggedIn()) {
        return <Navigate to="/home" />
    }
    return children.children;
}
export default RedirectIfLoggedIn;