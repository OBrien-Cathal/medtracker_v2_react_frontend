import {IAuthenticatedUser, IAuthenticationResponse} from "../types/authentication.type.ts";


class AuthenticationManager {
    private _user: IAuthenticatedUser = AuthenticationManager.defaultAuthenticatedUser()

    static defaultAuthenticatedUser(): IAuthenticatedUser {
        return {username: "", token: "", currentUserRole: "ANON"}
    }

    public getLoggedInUser(): IAuthenticatedUser {
        if (!this.userIsDefault()) {
            console.log("not default user"+ this._user)
            return this._user
        }
        this.setUserFromSessionStorage();
        console.log("set storage user: " + this._user)
        return this._user
    }

    public setLoggedInUser(value: IAuthenticatedUser) {
        this._user = value
        sessionStorage.setItem('user', JSON.stringify(value));
    }

    private setUserFromSessionStorage(): IAuthenticatedUser {
        const userOrNull: string | null = sessionStorage.getItem('user')
        if (userOrNull) {
            this._user = JSON.parse(userOrNull)
        }
        return this._user
    }

    public getToken(): string {
        return this.getLoggedInUser().token
    }

    private userIsDefault(): boolean {
        if (this._user.username === '') this.setUserFromSessionStorage()
        return this._user.currentUserRole === "ANON"
    }

    public isLoggedIn(): boolean {
        console.log("Is logged in: " + !this.userIsDefault())
        return !this.userIsDefault()
    }

    public removeLogin() {
        this._user = AuthenticationManager.defaultAuthenticatedUser()
        sessionStorage.removeItem('user')
    }

    public login(userToLogin: IAuthenticatedUser) {
        this.setLoggedInUser(userToLogin)
    }

    public handleAndValidateIAuthenticationResponse(response: IAuthenticationResponse, username: string):boolean {
        const success = 'success' === response.message;
        if (success) {
            this.login({
                username,
                token: response.token,
                currentUserRole: response.currentUserRole
            })
        }
        return success
    }
}

export default new AuthenticationManager()
