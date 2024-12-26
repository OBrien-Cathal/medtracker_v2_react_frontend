import {admin_routes} from "../routes/AdminRoutes.tsx";
import {user_routes} from "../routes/UserRoutes.tsx";
import {allRoles_routes} from "../routes/AllRolesRoutes.tsx";
import {public_routes} from "../routes/UnProtectedRoutes.tsx";
import RoleAwareNavElement from "./RoleAwareNavElement.tsx";
import NavElement from "./NavElement.tsx";
import {auth_routes} from "../routes/AuthRoutes.tsx";
import authenticationManager from "../auth/authenticationManager.tsx";
import {patient_routes} from "../routes/PatientRoutes.tsx";
import {practitioner_routes} from "../routes/PractitionerRoutes.tsx";


export default function Navigation(props: any) {

    const protectedRoutes = [
        ...user_routes,
        ...patient_routes,
        ...practitioner_routes,
        ...admin_routes,
        ...allRoles_routes,
    ];
    const unprotectedRoutes = [...public_routes, ...auth_routes];
    console.log(props.isLoggedIn)
    const currentUserRole = authenticationManager.getLoggedInUser().currentUserRole
    return (<div className="Navigation">
            {
                protectedRoutes.map((e) => {
                    return (
                        <RoleAwareNavElement route={e} currentUserRole={currentUserRole}></RoleAwareNavElement>
                    );
                })
            }
            {
                unprotectedRoutes.map((e) => {
                    return (
                        <NavElement route={e}></NavElement>
                    );
                })
            }
        </div>
    );


}
