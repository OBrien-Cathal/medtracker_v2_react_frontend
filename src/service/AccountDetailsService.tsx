import AuthenticatedService from "./authenticatedService.tsx";
import {IAccountDetailsType} from "../types/account-details.type.ts";

class AccountDetailsService extends AuthenticatedService {

    constructor(token: string) {
        super(token, "/account-details");
    }

    getPatientAccountDetails(patientId: string) {
        console.log("senfing "+ patientId)
        return this._client.get<IAccountDetailsType>("/patient?patient-id=" + patientId);
    }

    getAccountDetails() {
        return this._client.get<IAccountDetailsType>("");
    }
}

export default AccountDetailsService;
