import {IMedicationType} from "./medication.type.ts";

export interface IPrescriptionType {
    id: bigint
    doseMg: number
    medication: IMedicationType
    patientUsername: string
    practitionerUsername:string
    beginTime: string
    endTime:string
}