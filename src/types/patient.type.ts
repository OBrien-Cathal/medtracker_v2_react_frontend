export interface IPatientRegistrationData{
    id: bigint
    userModelId: bigint
    practitionerId: bigint
    approved: boolean
}

export interface IPatientRegistrationResponse{
    message: string
    errors: string[]
    data: IPatientRegistrationData
}

export interface IPatientRegistrationRequest{
    practitionerId: bigint
}


