export interface IResponse {
    successful: boolean
    message: string
    errors: string[]
}

export interface IResponse2  {
    responseInfo: IResponse
}