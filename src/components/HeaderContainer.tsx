import UserStatus from "./UserStatus.tsx";

const HeaderContainer = (children: any) => {
    return (

        <div className="HeaderContainer">
            <div className="Header">Med Tracker</div>
            <div className="user-status-container">
                <UserStatus ></UserStatus>
            </div>
            {children.children}
        </div>)
}

export default HeaderContainer