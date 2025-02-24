import {userRoles as ur} from "../data/userRoles.ts";
import DataManagement from "../pages/patient/DataManagement.tsx";
import Prescriptions from "../pages/patient/Prescriptions.tsx";
import DataVis from "../pages/patient/DataVis.tsx";
import DailyData from "../pages/patient/DailyData.tsx";


export const patient_routes = [
    {
        path: "/dataManagement",
        ele: <DataManagement/>,
        availability: [ur.patient],
        title: "Data Management",
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
        title: "Visualizations",
        showInNav: true
    },
    {
        path: "/daily-data",
        ele: <DailyData/>,
        availability: [ur.patient],
        title: "Daily Data",
        showInNav: true
    }

]