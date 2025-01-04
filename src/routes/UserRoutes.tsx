import { userRoles as ur } from "../data/userRoles.ts";
import Upload from "../pages/Upload.tsx";
import PatientRegistration from "../pages/PatientRegistration.tsx";
export const user_routes = [
    {
        path: "/upload",
        ele: <Upload />,
        availability: [ur.user],
        title: "Upload",
        showInNav: true
    },
    {
        path: "/patientRegistration",
        ele: <PatientRegistration />,
        availability: [ur.user, ur.patient],
        title: "Patient Registration",
        showInNav: true
    }
]