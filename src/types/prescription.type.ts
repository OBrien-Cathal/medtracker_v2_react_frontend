import {IMedicationType} from "./medication.type.ts";
import {IResponse} from "./generic.type.ts";


export interface IPrescriptionOverviewType {
    id: bigint | null
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
    medication: IMedicationType | null,
    beginTime: string
    endTime: string | null
    patientId: number | null
    practitionerId: number | null
    prescriptionScheduleEntries: IPrescriptionScheduleEntryType[]
}

export interface IPrescriptionScheduleEntryType {
    id: number | null
    dayStage: string
}

export interface ISubmitPrescriptionDetailsResponse extends IResponse {
    prescriptionId: bigint
}

export interface IGetPrescriptionDetailsResponse extends IResponse {
    prescriptionDetails: IPrescriptionDetailsType
}

