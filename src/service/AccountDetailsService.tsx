import AuthenticatedService from "./authenticatedService.tsx";
import {IAccountDetailsType} from "../types/account-details.type.ts";
import {IResponse} from "../types/generic.type.ts";


class AccountDetailsService extends AuthenticatedService {

    constructor(token: string) {
        super(token, "/account-details");
    }


    getPatientAccountDetails(patientId: string) {

        return this._client.get<IAccountDetailsType>("/patient?patient-id=" + patientId);
    }

    getAccountDetails() {
        return this._client.get<IAccountDetailsType>("");
    }


    updateAccountDetails(firstName: string, surname: string) {
        return this._client.post<IResponse>(
            "",
            {firstName: firstName, surname: surname});
    }
}

export default AccountDetailsService;
