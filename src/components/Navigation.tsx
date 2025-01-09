import {admin_routes} from "../routes/AdminRoutes.tsx";
import {user_routes} from "../routes/UserRoutes.tsx";
import {allRoles_routes} from "../routes/AllRolesRoutes.tsx";
import {public_routes} from "../routes/UnProtectedRoutes.tsx";
import RoleAwareNavElement from "./RoleAwareNavElement.tsx";
import NavElement from "./NavElement.tsx";
import {auth_routes} from "../routes/AuthRoutes.tsx";
import {patient_routes} from "../routes/PatientRoutes.tsx";
import {practitioner_routes} from "../routes/PractitionerRoutes.tsx";
import {useAuth} from "../auth/AuthProvider.tsx";
import {user_patient_routes} from "../routes/UserAndPatientRoutes.tsx";
import {patient_practitioner_routes} from "../routes/PatientAndPractitionerRoutes.tsx";


export default function Navigation() {

    const protectedRoutes = [
        ...user_routes,
        ...user_patient_routes,
        ...patient_routes,
        ...practitioner_routes,
        ...patient_practitioner_routes,
        ...admin_routes,
        ...allRoles_routes,
    ];
    const unprotectedRoutes = [...public_routes, ...auth_routes];
    const {currentRole} = useAuth()

    return (<div className="Navigation">
            {
                protectedRoutes.map((e) => {
                    return (
                        <RoleAwareNavElement route={e} currentUserRole={currentRole}></RoleAwareNavElement>
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
