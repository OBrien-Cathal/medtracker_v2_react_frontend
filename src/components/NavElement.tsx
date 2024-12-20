import {NavLink} from "react-router-dom";

const RoleAwareNavElement = (props: any) => {
    console.log(props.route)
    if (props.route.showInNav)
        return (
            <div className="NavElement">
                {<NavLink to={props.route.path}>{props.route.title}</NavLink>}
            </div>
        )
}
export default RoleAwareNavElement