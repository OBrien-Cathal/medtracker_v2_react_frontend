import RequireAuth from "./utils/RequireAuth";
import RedirectIfLoggedIn from "./utils/RedirectIfLoggedIn";

// unprotectedRoutes
import {public_routes} from "./UnProtectedRoutes";
// protectedRoutes
import {admin_routes} from "./AdminRoutes";
import {user_routes} from "./UserRoutes";
import {allRoles_routes} from "./AllRolesRoutes.tsx";
// authenticationRoutes
import {auth_routes} from "./AuthRoutes.tsx";
import * as React from "preact/compat";

import {patient_routes} from "./PatientRoutes.tsx";
import {practitioner_routes} from "./PractitionerRoutes.tsx";
import {Route, Routes, useLocation} from "react-router-dom";
import {patient_practitioner_routes} from "./PatientAndPractitionerRoutes.tsx";
import {user_patient_routes} from "./UserAndPatientRoutes.tsx";
import {useLayoutEffect} from "preact/compat";


const AppRoutes = () => {
    const location = useLocation();

    useLayoutEffect(() => {
        // Scroll to the top of the page when the route changes
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);




    const protectedRoutes = [
        ...user_routes,
        ...user_patient_routes,
        ...patient_routes,
        ...practitioner_routes,
        ...patient_practitioner_routes,
        ...admin_routes,
        ...allRoles_routes
    ];
    const unprotectedRoutes = [...public_routes];

    return (
        <div className={'route-container'}>
            <Routes>
                {
                    unprotectedRoutes.map((e) => {
                        return (
                            <Route
                                key={e.path}
                                path={e.path}
                                element={React.cloneElement(e.ele)}
                            />
                        );
                    })
                }
                {
                    auth_routes.map((e) => {
                        return (
                            <Route
                                key={e.path}
                                path={e.path}
                                element={
                                    <RedirectIfLoggedIn>
                                        {React.cloneElement(e.ele)}
                                    </RedirectIfLoggedIn>
                                }
                                // element={e.ele}
                            />
                        );
                    })
                }

                {
                    protectedRoutes.map((e) => {
                        return (
                            <Route
                                key={e.path}
                                path={e.path}
                                element={
                                    <RequireAuth userroles={e.availability}>
                                        {e.ele}
                                    </RequireAuth>
                                }
                                // element={e.ele}
                            />
                        );
                    })
                }
            </Routes></div>


    );
};
export default AppRoutes;
