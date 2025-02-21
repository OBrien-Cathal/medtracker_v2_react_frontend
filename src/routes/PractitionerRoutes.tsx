import { userRoles as ur } from "../data/userRoles.ts";
import Medications from "../pages/Practitioner/Medications.tsx";
import PatientList from "../pages/Practitioner/PatientList.tsx";
import PatientDetails from "../pages/Practitioner/PatientDetails.tsx";
import PractitionerDataManagement from "../pages/Practitioner/PractitionerDataManagement.tsx";
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
    },
    {
        path: "/patient-details/:id",
        ele: <PatientDetails />,
        availability: [ur.practitioner],
        title: "Patient Details",
        showInNav: false
    },
    {
        path: "/practitioner-data-management",
        ele: <PractitionerDataManagement />,
        availability: [ur.practitioner],
        title: "Data Management",
        showInNav: true
    },

]