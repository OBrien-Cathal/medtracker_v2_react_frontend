import AuthenticatedService from "./authenticatedService.tsx";
import {IResponse} from "../types/generic.type.ts";
import {IPrescriptionType} from "../types/prescription.type.ts";

export class PrescriptionService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/prescriptions");
    }

    getPrescriptionsForPractitionerPatient() {
        return this._client.get<IPrescriptionType[]>("");
    }

    getPrescriptions() {
        return this._client.get<IPrescriptionType[]>("");
    }

    addPrescription(medName: string) {
        return this._client.post<IResponse>(
            "add",
            {
                id: null,
                name: medName
            }
        )
    }
}