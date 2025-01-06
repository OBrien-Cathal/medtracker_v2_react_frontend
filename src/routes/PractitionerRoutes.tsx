import { userRoles as ur } from "../data/userRoles.ts";
import Medications from "../pages/Medications.tsx";
import PatientList from "../pages/Practitioner/PatientList.tsx";
export const practitioner_routes = [
    {
        path: "/medications",
        ele: <Medications />,
        availability: [ur.practitioner],
        title: "Medications",
        showInNav: true
    },
    {
        path: "/patients",
        ele: <PatientList />,
        availability: [ur.practitioner],
        title: "Patients",
        showInNav: true
    }
]