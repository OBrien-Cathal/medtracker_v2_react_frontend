import {IRoleChange, IRoleChangeStatus} from "../types/user.type.ts";
import {IResponse} from "../types/generic.type.ts";
import AuthenticatedService from "./authenticatedService.tsx";

export class RoleChangeService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/role-requests");
    }


    requestRoleChange(roleName: string) {
        return this._client.post<IResponse>(
            "/submit",
            {newRole: roleName},
        );
    }

    approveRoleChange(roleChangeId: bigint) {
        return this._client.post<IResponse>(
            "/approve",
            {roleChangeRequestId: roleChangeId},
        );
    }

    getRoleChangeStatus() {
        return this._client.get<IRoleChangeStatus>(
            "/status",
        );
    }

    getUnapprovedRoleChanges() {
        return this._client.get<IRoleChange[]>(
            "/unapproved",
        );
    }
}
