import AuthenticatedService from "./authenticatedService.tsx";
import {IPatientRegistrationData, IPatientRegistrationResponse} from "../types/patient.type.ts";
import {IUserModel} from "../types/user.type.ts";
import {IResponseInfo} from "../types/generic.type.ts";

export class PatientDataService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/patients");
    }

    private _registrationsPath: string = "registrations"
    private _uploadPath: string = "upload"

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

    uploadDoseFile(file: FormData) {

        return this._client.post<IResponseInfo>(
            this._uploadPath + "/dose-upload",
            file,
            {
                headers: {
                    "Authorization": 'Bearer ' + this._token,
                    "Content-type": "multipart/form-data",
                },
            }
        );
    }

    uploadBloodPressureFile(file: FormData) {
        return this._client.post<IResponseInfo>(
            this._uploadPath + "/blood-pressure-upload",
            file,
            {
                headers: {
                    "Authorization": 'Bearer ' + this._token,
                    "Content-type": "multipart/form-data",
                },
            }
        );
    }


}