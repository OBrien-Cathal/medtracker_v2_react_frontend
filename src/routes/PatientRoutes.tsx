import {userRoles as ur} from "../data/userRoles.ts";
import Upload from "../pages/patient/Upload.tsx";

export const patient_routes = [
   {
        path: "/upload",
        ele: <Upload/>,
        availability: [ur.patient],
        title: "Upload",
        showInNav: true
    },
]