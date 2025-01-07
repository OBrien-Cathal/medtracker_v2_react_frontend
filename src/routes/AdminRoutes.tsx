import { userRoles as ur } from "../data/userRoles.ts";
import UserManagement from "../pages/admin/UserManagement.tsx";
export const admin_routes = [
    { 
        path: "/userManagement",
        ele: <UserManagement/>,
        availability:[ur.admin],
        title: "User Management",
        showInNav: true
    }
]