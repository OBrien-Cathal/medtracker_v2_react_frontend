import {IMedicationType} from "./medication.type.ts";
import {IResponse2} from "./generic.type.ts";


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
    prescriptionScheduleEntries: string[]
}

export interface IPrescriptionScheduleEntryType {
    id: bigint
    dayStage: string
}

export interface ISubmitPrescriptionDetailsResponse extends IResponse2 {
    prescriptionId: bigint
}

export interface IGetPrescriptionDetailsResponse extends IResponse2 {
    prescriptionDetails: IPrescriptionDetailsType
}

