import Login from "../pages/Login";
import Register from "../pages/Register";
import ConfirmRegistration from "../pages/ConfirmRegistration.tsx";

export const auth_routes = [

    {
        path: "/",
        ele: <Login></Login>,
        availability: [],
        title: "Login",
        showInNav: false
    },
    {
        path: "/login",
        ele: <Login></Login>,
        availability: [],
        title: "Login",
        showInNav: false
    },
    {
        path: "/register",
        ele: <Register></Register>,
        availability: [],
        title: "Register",
        showInNav: false
    },
    {
        path: "/account-registration/:regUUID/:userId",
        ele: <ConfirmRegistration></ConfirmRegistration>,
        availability: [],
        title: "Confirm Registration",
        showInNav: false
    }
]