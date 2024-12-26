import http from "../service/http-client";
import {IRoleChange, IRoleChangeStatus, IUserModel} from "../types/user.type.ts";
import {IGenericResponse} from "../types/generic.type.ts";


export class UserDataService {
    private _users: string = "/users";
    private _token: string = ""

    public setToken(token: string) {
        this._token = token
    }

    getUsers() {
        return http.get<IUserModel[]>(this._users, {
            headers: {
                'Authorization': 'Bearer ' + this._token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    requestRoleChange(roleName: string) {
        return http.post<IGenericResponse>(
            this._users + "/role-requests/submit",
            {newRole: roleName},
            {
                headers: {
                    'Authorization': 'Bearer ' + this._token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    }
    approveRoleChange(roleChangeId: bigint) {
        return http.post<IGenericResponse>(
            this._users + "/role-requests/approve",
            {roleChangeRequestId: roleChangeId},
            {
                headers: {
                    'Authorization': 'Bearer ' + this._token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    }

    getRoleChangeStatus() {
        return http.get<IRoleChangeStatus>(
            this._users + "/role-requests/status",
            {
                headers: {
                    'Authorization': 'Bearer ' + this._token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    }
    getUnapprovedRoleChanges() {
        return http.get<IRoleChange[]>(
            this._users + "/role-requests/unapproved",
            {
                headers: {
                    'Authorization': 'Bearer ' + this._token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    }
}


export default new UserDataService();
