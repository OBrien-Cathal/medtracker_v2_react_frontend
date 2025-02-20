import AuthenticatedService from "./authenticatedService.tsx";
import {ISignInRecordType} from "../types/sign-in-records.type.ts";

export class SignInRecordsService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/sign-in-records");
    }

    getSignInRecords() {
        return this._client.get<ISignInRecordType[]>("");
    }


}
