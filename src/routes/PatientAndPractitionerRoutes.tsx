import {userRoles as ur} from "../data/userRoles.ts";
import MedicationDetails from "../pages/patient_practitioner/MedicationDetails.tsx";
import PrescriptionDetails from "../pages/patient_practitioner/PrescriptionDetails.tsx";

export const patient_practitioner_routes = [
    {
        path: "/medication-details/:id",
        ele: <MedicationDetails/>,
        availability: [ur.patient, ur.practitioner],
        title: "Medication Details",
        showInNav: false
    },
    {
        path: "/prescription-details/:id",
        ele: <PrescriptionDetails/>,
        availability: [ur.patient, ur.practitioner],
        title: "Prescription Details",
        showInNav: false
    }
]