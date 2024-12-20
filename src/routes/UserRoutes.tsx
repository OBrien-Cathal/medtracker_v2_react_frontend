import { userRoles as ur } from "../data/userRoles.ts";
import Upload from "../pages/Upload.tsx";
export const user_routes = [
    {
        path: "/upload",
        ele: <Upload />,
        availability: [ur.user],
        title: "Upload",
        showInNav: true
    }
]