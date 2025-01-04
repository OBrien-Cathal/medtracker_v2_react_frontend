import AuthenticatedService from "./authenticatedService.tsx";
import {IPatientRegistrationData, IPatientRegistrationResponse} from "../types/patient.type.ts";

export class PatientDataService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/patients");
    }

    private _registrationsPath: string = "registrations"

    getPatientRegistrations() {
        return this._client.get<IPatientRegistrationData[]>(this._registrationsPath);
    }

    submitPatientRegistration(practitionerId: bigint) {
        return this._client.post<IPatientRegistrationResponse>(
            this._registrationsPath + "/submit",
            {practitionerId});
    }
    approvePatientRegistration(practitionerId: bigint) {
        return this._client.post<IPatientRegistrationResponse>(
            this._registrationsPath + "/approve",
            {practitionerId});
    }



}