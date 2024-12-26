import { userRoles as ur } from "../data/userRoles.ts";
import Medications from "../pages/Medications.tsx";
export const practitioner_routes = [
    {
        path: "/medications",
        ele: <Medications />,
        availability: [ur.practitioner],
        title: "Medications",
        showInNav: true
    }
]