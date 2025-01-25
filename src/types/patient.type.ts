import {IResponseInfo} from "./generic.type.ts";

export interface IPatientRegistrationData{
    id: bigint
    userModelId: bigint
    practitionerId: bigint
    approved: boolean
}

export interface IPatientRegistrationResponse extends IResponseInfo{
    data: IPatientRegistrationData
}

export interface IPatientRegistrationRequest{
    practitionerId: bigint
}


