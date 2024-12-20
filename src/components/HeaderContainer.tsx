import UserStatus from "./UserStatus.tsx";

const HeaderContainer = (children: any) => {
    console.log(children)
    return (

        <div className="HeaderContainer">
            <div className="Header">Med Tracker</div>
            <div className="user-status-container">
                <UserStatus isLoggedIn={children.isLoggedIn}></UserStatus>
            </div>
            {children.children}
        </div>)
}

export default HeaderContainer