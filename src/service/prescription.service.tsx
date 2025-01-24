import AuthenticatedService from "./authenticatedService.tsx";
import {
    ISubmitPrescriptionDetailsResponse, IGetPrescriptionDetailsResponse,
    IPrescriptionDetailsType,
    IPrescriptionOverviewType
} from "../types/prescription.type.ts";

export class PrescriptionService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/prescriptions");
    }

    getPrescriptionsForPractitionerPatient(patientId: number) {
        return this._client.get<IPrescriptionOverviewType[]>("/patient?id=" + patientId);
    }

    getPrescriptions() {
        return this._client.get<IPrescriptionOverviewType[]>("");
    }
    getDayStages() {
        return this._client.get<string[]>("/day-stages");
    }

    getPrescriptionDetails(prescriptionId: bigint) {
        return this._client.get<IGetPrescriptionDetailsResponse>("/prescription-details?id=" + prescriptionId);
    }

    updatePrescription(details: IPrescriptionDetailsType) {
        return this._client.post<ISubmitPrescriptionDetailsResponse>(
            "update",
            details
        )
    }
    addPrescription(details: IPrescriptionDetailsType) {
        return this._client.post<ISubmitPrescriptionDetailsResponse>(
            "add",
            details
        )
    }
}