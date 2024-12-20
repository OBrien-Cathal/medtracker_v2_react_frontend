import {NavLink} from "react-router-dom";

const RoleAwareNavElement = (props: any) => {

    if (props.route.showInNav && props.route.availability
        .includes(props.currentUserRole)) {
        return (
            <div className="NavElement">
                {<NavLink to={props.route.path}>{props.route.title}</NavLink>}
            </div>

        )
    } else {
        return ''
    }
}
export default RoleAwareNavElement