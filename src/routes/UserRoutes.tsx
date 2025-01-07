import { userRoles as ur } from "../data/userRoles.ts";
import PatientRegistration from "../pages/PatientRegistration.tsx";
export const user_routes = [

    {
        path: "/patientRegistration",
        ele: <PatientRegistration />,
        availability: [ur.user, ur.patient],
        title: "Patient Registration",
        showInNav: true
    }
]