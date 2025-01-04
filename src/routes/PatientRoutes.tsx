import { userRoles as ur } from "../data/userRoles.ts";
import PatientRegistration from "../pages/PatientRegistration.tsx";
export const patient_routes = [
    {
        path: "/practitioner-registration",
        ele: <PatientRegistration />,
        availability: [ur.patient],
        title: "Practitioners",
        showInNav: true
    }
]