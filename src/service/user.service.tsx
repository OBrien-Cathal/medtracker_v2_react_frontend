import {IRoleChange, IRoleChangeStatus, IUserModel} from "../types/user.type.ts";
import {IResponse} from "../types/generic.type.ts";
import AuthenticatedService from "./authenticatedService.tsx";

export class UserDataService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/users");
    }

    getUsers() {
        return this._client.get<IUserModel[]>("");
    }
    getPractitionerUsers() {
        return this._client.get<IUserModel[]>("/practitioners");
    }

    requestRoleChange(roleName: string) {
        return this._client.post<IResponse>(
            "/role-requests/submit",
            {newRole: roleName},
        );
    }

    approveRoleChange(roleChangeId: bigint) {
        return this._client.post<IResponse>(
            "/role-requests/approve",
            {roleChangeRequestId: roleChangeId},
        );
    }

    getRoleChangeStatus() {
        return this._client.get<IRoleChangeStatus>(
            "/role-requests/status",
        );
    }

    getUnapprovedRoleChanges() {
        return this._client.get<IRoleChange[]>(
            "/role-requests/unapproved",
        );
    }
}
