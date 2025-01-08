import AuthenticatedService from "./authenticatedService.tsx";
import {IMedicationType} from "../types/medication.type.ts";
import {IResponse} from "../types/generic.type.ts";

export class MedicationService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/medications");
    }

    getMedicationsByPractitioner() {
        return this._client.get<IMedicationType[]>("");
    }

    getMedicationsByPatient() {
        return this._client.get<IMedicationType[]>("/patient");
    }

    addMedication(medName: string) {
        return this._client.post<IResponse>(
            "add",
            {
                id: null,
                name: medName
            }
        )
    }
}