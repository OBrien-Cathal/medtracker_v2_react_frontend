import AuthenticatedService from "./authenticatedService.tsx";
import {IAddMedicationResponse, IMedicationType} from "../types/medication.type.ts";

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
        return this._client.post<IAddMedicationResponse>(
            "add",
            {
                id: null,
                name: medName
            }
        )
    }
}