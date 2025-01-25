import {IResponse} from "./generic.type.ts";

export interface IPatientRegistrationData{
    id: bigint
    userModelId: bigint
    practitionerId: bigint
    approved: boolean
}

export interface IPatientRegistrationResponse extends IResponse{
    data: IPatientRegistrationData
}

export interface IPatientRegistrationRequest{
    practitionerId: bigint
}


