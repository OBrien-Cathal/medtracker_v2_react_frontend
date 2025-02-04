import Login from "../pages/Login";
import Register from "../pages/Register";

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
    }
]