import AuthenticatedService from "./authenticatedService.tsx";
import {IPatientRegistrationData, IPatientRegistrationResponse} from "../types/patient.type.ts";
import {IUserModel} from "../types/user.type.ts";

export class PatientDataService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/patients");
    }

    private _registrationsPath: string = "registrations"

    getPatientRegistrations() {
        return this._client.get<IPatientRegistrationData[]>(this._registrationsPath);
    }

    getPatientUsers() {
        return this._client.get<IUserModel[]>("");
    }

    submitPatientRegistration(practitionerId: bigint) {
        return this._client.post<IPatientRegistrationResponse>(
            this._registrationsPath + "/submit",
            {practitionerId});
    }

    approvePatientRegistration(patientRegistrationId: bigint) {
        return this._client.post<IPatientRegistrationResponse>(
            this._registrationsPath + "/approve",
            {patientRegistrationId: patientRegistrationId});
    }



}