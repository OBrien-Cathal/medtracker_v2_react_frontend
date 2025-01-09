import {userRoles as ur} from "../data/userRoles.ts";
import Upload from "../pages/patient/Upload.tsx";
import Prescriptions from "../pages/patient/Prescriptions.tsx";
import DataVis from "../pages/patient/DataVis.tsx";


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
    }

]