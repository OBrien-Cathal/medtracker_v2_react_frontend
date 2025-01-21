import {IMedicationType} from "./medication.type.ts";


export interface IPrescriptionOverviewType {
    id: bigint
    doseMg: number
    medication: IMedicationType
    patientUsername: string
    practitionerUsername: string
    beginTime: string
    endTime: string
}

export interface IPrescriptionDetailsType {
    id: number | null
    doseMg: number
    medicationId: number
    beginTime: string
    endTime: string
    patientId: number | null
    practitionerId: number | null
    prescriptionScheduleEntries: []
}

export interface IPrescriptionScheduleEntryType {
    id: bigint
    dayStage: string
}

export interface IAddPrescriptionRequest {
    prescriptionDetails: IPrescriptionDetailsType
}

export interface IPrescriptionRequest {
    prescriptionDetails: IPrescriptionDetailsType
}