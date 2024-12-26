import {BrowserRouter, Route, Routes} from "react-router-dom";
import RequireAuth from "../utils/RequireAuth";
import RedirectIfLoggedIn from "../utils/RedirectIfLoggedIn";
import Navigation from "../components/Navigation.tsx";
import {useEffect, useState} from "preact/compat";
import authenticationManager from "../auth/authenticationManager.tsx";
import authenticationDataService from "../service/authentication.service.tsx";
// unprotectedRoutes
import {public_routes} from "./UnProtectedRoutes";
// protectedRoutes
import {admin_routes} from "./AdminRoutes";
import {user_routes} from "./UserRoutes";
import {allRoles_routes} from "./AllRolesRoutes.tsx";
// authenticationRoutes
import {auth_routes} from "./AuthRoutes.tsx";
import * as React from "preact/compat";
import HeaderContainer from "../components/HeaderContainer"
import {patient_routes} from "./PatientRoutes.tsx";
import {practitioner_routes} from "./PractitionerRoutes.tsx";

const AppRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authenticationDataService.verifyAuthentication({token: authenticationManager.getToken()})
            .then(value => {
                console.log(value)
                if (!value.data.authenticated) {
                    authenticationManager.removeLogin()
                    setIsLoggedIn(false)
                } else {
                    setIsLoggedIn(true)
                }
            }).catch((r) => {
            console.log(r.error.message)
        });
    })
    const protectedRoutes = [
        ...user_routes,
        ...patient_routes,
        ...practitioner_routes,
        ...admin_routes,
        ...allRoles_routes,
        ...public_routes

    ];
    const unprotectedRoutes = [...public_routes];

    return (
        <BrowserRouter>
            <HeaderContainer isLoggedIn={isLoggedIn}>
                <Navigation isLoggedIn={isLoggedIn}/>
            </HeaderContainer>
            <Routes>
                {
                    unprotectedRoutes.map((e) => {
                        return (
                            <Route
                                key={e.path}
                                path={e.path}
                                element={React.cloneElement(e.ele, {setIsLoggedIn})}
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
                                        {React.cloneElement(e.ele, {setIsLoggedIn})}
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
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes;
