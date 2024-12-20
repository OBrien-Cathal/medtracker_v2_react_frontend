import {admin_routes} from "../routes/AdminRoutes.tsx";
import {user_routes} from "../routes/UserRoutes.tsx";
import {allRoles_routes} from "../routes/AllRolesRoutes.tsx";
import {public_routes} from "../routes/UnProtectedRoutes.tsx";
import RoleAwareNavElement from "./RoleAwareNavElement.tsx";
import NavElement from "./NavElement.tsx";
import {auth_routes} from "../routes/AuthRoutes.tsx";
import authenticationManager from "../auth/authenticationManager.tsx";


export default function Navigation(props: any) {

    const protectedRoutes = [
        ...admin_routes,
        ...user_routes,
        ...allRoles_routes
    ];
    const unprotectedRoutes = [...public_routes, ...auth_routes];
    console.log(props.isLoggedIn)
    const currentUserRole = authenticationManager.getLoggedInUser().currentUserRole
    return (<div className="Navigation">
            {
                unprotectedRoutes.map((e) => {
                    return (
                        <NavElement route={e}></NavElement>
                    );
                })
            }

            {
                protectedRoutes.map((e) => {
                    return (
                        <RoleAwareNavElement route={e} currentUserRole={currentUserRole}></RoleAwareNavElement>
                    );
                })
            }
        </div>
    );


}
