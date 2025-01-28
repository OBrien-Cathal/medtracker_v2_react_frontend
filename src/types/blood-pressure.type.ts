import {IDatedDataRequest, IDatedDataResponse} from "./dated.type.ts";

export interface IBloodPressureData {
    systole: number
    diastole: number
    heartRate: number
    dayStage: string

}
export interface ISubmittedBloodPressureData extends IBloodPressureData{
    readingTime: string
}


export interface IBloodPressureDataRequestResponse extends IDatedDataResponse {
    readings: ISubmittedBloodPressureData[]
}

export interface IAddDatedBloodPressureDataRequest extends IDatedDataRequest {
    data: IBloodPressureData
}

export interface IAddDatedBloodPressureDataRequestResponse extends IDatedDataResponse {

}