import AuthenticatedService from "./authenticatedService.tsx";
import {IResponse} from "../types/generic.type.ts";
import {
    IAddPrescriptionResponse, IGetPrescriptionDetailsResponse,
    IPrescriptionDetailsType,
    IPrescriptionOverviewType
} from "../types/prescription.type.ts";

export class PrescriptionService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/prescriptions");
    }

    getPrescriptionsForPractitionerPatient(patientId: string | undefined) {
        return this._client.get<IPrescriptionOverviewType[]>("/patient?id=" + patientId);
    }

    getPrescriptions() {
        return this._client.get<IPrescriptionOverviewType[]>("");
    }

    getPrescriptionDetails(prescriptionId: number | null) {
        return this._client.get<IGetPrescriptionDetailsResponse>("/prescription-details?id=" + prescriptionId);
    }

    updatePrescription(details: IPrescriptionDetailsType) {
        return this._client.post<IResponse>(
            "update",
            details
        )
    }
    addPrescription(details: IPrescriptionDetailsType) {
        return this._client.post<IAddPrescriptionResponse>(
            "add",
            details
        )
    }
}