import { userRoles as ur } from "../data/userRoles.ts";
import UserManagement from "../pages/UserManagement.tsx";
export const admin_routes = [
    { 
        path: "/userManagement",
        ele: <UserManagement/>,
        availability:[ur.admin],
        title: "User Management",
        showInNav: true
    }
]