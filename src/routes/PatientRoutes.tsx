import {userRoles as ur} from "../data/userRoles.ts";
import Upload from "../pages/patient/Upload.tsx";
import Prescriptions from "../pages/patient/Prescriptions.tsx";
import DataVis from "../pages/patient/DataVis.tsx";
import PatientPrescriptionDetails from "../pages/patient/PatientPrescriptionDetails.tsx";


export const patient_routes = [
    {
        path: "/upload",
        ele: <Upload/>,
        availability: [ur.patient],
        title: "Upload",
        showInNav: true
    },
    {
        path: "/prescriptions",
        ele: <Prescriptions/>,
        availability: [ur.patient],
        title: "Prescriptions",
        showInNav: true
    },
    {
        path: "/data-visualizations",
        ele: <DataVis/>,
        availability: [ur.patient],
        title: "Data Visualizations",
        showInNav: true
    },   {
        path: "/patient-prescription-details/:id",
        ele: <PatientPrescriptionDetails/>,
        availability: [ur.patient],
        title: "Prescription Details",
        showInNav: false
    }

]