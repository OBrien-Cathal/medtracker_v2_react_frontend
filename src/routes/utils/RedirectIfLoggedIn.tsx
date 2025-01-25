import {Navigate} from "react-router-dom";
import {useAuth} from "../../auth/AuthProvider.tsx";


const RedirectIfLoggedIn = (children:any)=>{
    const {isLoggedIn} = useAuth()
    if (isLoggedIn) {
        return <Navigate to="/home" />
    }
    return children.children;
}
export default RedirectIfLoggedIn;