import { userRoles as ur } from "../data/userRoles.ts";
import PractitionerRegistration from "../pages/PractitionerRegistration.tsx";
export const patient_routes = [
    {
        path: "/practitioner-registration",
        ele: <PractitionerRegistration />,
        availability: [ur.patient],
        title: "Practitioners",
        showInNav: true
    }
]