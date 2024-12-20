import Home from "../pages/Home.tsx";
import {userRoles as ur} from "../data/userRoles.ts";
import AboutPage from "../pages/About.tsx";

const availableToAll =[ur.user, ur.admin, ur.practitioner, ur.anonymous]

export const public_routes = [
    {
        path: "/home",
        ele: <Home></Home>,
        availability: availableToAll,
        title: "Home",
        showInNav: true
    },
    {
        path: "/about",
        ele: <AboutPage></AboutPage>,
        availability: availableToAll,
        title: "About",
        showInNav: true
    },
]