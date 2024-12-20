import http from "../service/http-client";
import {IUserModel} from "../types/user.type.ts";


class UserDataService {
    private _users: string = "/users";
    private _token: string = ""

    public setToken(token: string) {
        this._token = token
    }

    getUsers() {
        return http.get<IUserModel[]>(this._users, {
            headers: {
                'Authorization': 'Bearer '  + this._token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default new UserDataService();
