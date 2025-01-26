import {IResponse} from "./generic.type.ts";

export interface IMedicationType {
    id: bigint
    name: string
}

export interface IAddMedicationResponse extends IResponse {
    medicationId: bigint
}