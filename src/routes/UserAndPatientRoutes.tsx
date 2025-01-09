import {userRoles as ur} from "../data/userRoles.ts";
import Practitioners from "../pages/Practitioners.tsx";

export const user_patient_routes = [
    {
        path: "/practitioners",
        ele: <Practitioners/>,
        availability: [ur.patient, ur.user ],
        title: "Practitioners",
        showInNav: true
    }
]