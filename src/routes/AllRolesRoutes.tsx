import AccountManagement from "../pages/AccountManagement.tsx";
import {userRoles as ur} from "../data/userRoles.ts";

export const allRoles_routes = [
    {
        path: "/accountManagement",
        ele: <AccountManagement/>,
        availability: [ur.user, ur.patient, ur.practitioner, ur.admin,],
        title: "Account Management",
        showInNav: false
    }
]