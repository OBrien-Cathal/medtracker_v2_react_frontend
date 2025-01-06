export interface IPatientRegistrationData{
    id: bigint
    userModelId: bigint
    practitionerId: bigint
    approved: boolean
}

export interface IPatientRegistrationResponse{
    successful: boolean
    message: string
    errors: string[]
    data: IPatientRegistrationData
}

export interface IPatientRegistrationRequest{
    practitionerId: bigint
}


