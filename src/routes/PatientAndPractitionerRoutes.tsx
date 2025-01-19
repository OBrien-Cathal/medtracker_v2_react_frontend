import {userRoles as ur} from "../data/userRoles.ts";
import MedicationDetails from "../pages/patient_practitioner/MedicationDetails.tsx";

export const patient_practitioner_routes = [
    {
        path: "/medication-details/:id",
        ele: <MedicationDetails/>,
        availability: [ur.patient, ur.practitioner],
        title: "Medication Details",
        showInNav: false
    },

]