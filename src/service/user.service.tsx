import { IUserModel} from "../types/user.type.ts";

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

}
