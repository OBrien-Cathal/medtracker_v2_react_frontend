import {IMedicationType} from "./medication.type.ts";


export interface IPrescriptionType {
    id: bigint
    doseMg: number
    medication: IMedicationType
    patientUsername: string
    practitionerUsername: string
    beginTime: string
    endTime: string
}

export interface IPrescriptionDetailsType {
    patientId: bigint
    baseDetails: IPrescriptionType
    prescriptionScheduleEntries: []
}

export interface IPrescriptionScheduleEntryType {
    id: bigint
    dayStage: string
}

export interface IPrescriptionUpdateRequestType {
    prescriptionDetails: IPrescriptionDetailsType
}