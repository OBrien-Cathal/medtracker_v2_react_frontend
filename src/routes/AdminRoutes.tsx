import { userRoles as ur } from "../data/userRoles.ts";
import UserManagement from "../pages/admin/UserManagement.tsx";
import SignInRecords from "../pages/admin/SignInRecords.tsx";
export const admin_routes = [
    { 
        path: "/userManagement",
        ele: <UserManagement/>,
        availability:[ur.admin],
        title: "Role Management",
        showInNav: true
    },
    {
        path: "/sign-in-records",
        ele: <SignInRecords/>,
        availability:[ur.admin],
        title: "Access History",
        showInNav: true
    }
]