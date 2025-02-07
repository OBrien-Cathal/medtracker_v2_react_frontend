export interface IResponseInfo {
    successful: boolean
    message: string
    errors: string[]
}

export interface IResponse {
    responseInfo: IResponseInfo
}

export interface IDateRange {
    start: string
    end: string
}