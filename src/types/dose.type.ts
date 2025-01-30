import {IDatedDataRequest, IDatedDataResponse} from "./dated.type.ts";

export interface IDailyDoseData {
    doseId: bigint
    doseTime: string
    prescriptionScheduleEntryId: bigint
    dayStage: string
    taken: boolean
}

export interface IDailyMedicationDoseData {
    medicationName: string
    doseMg: number
    prescriptionId: bigint
    doses: IDailyDoseData[]
}


export interface IDailyDoseDataRequestResponse extends IDatedDataResponse {
    medicationDoses: IDailyMedicationDoseData[]
}

export interface IAddDailyDoseDataRequest extends IDatedDataRequest {
    dailyDoseData: IDailyDoseData
}

export interface IAddDailyDoseDataRequestResponse extends IDatedDataResponse {
    doseId: bigint
}