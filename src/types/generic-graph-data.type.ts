import {IResponse} from "./generic.type.ts";

export interface ITimeSeriesDataRequest {
    successful: boolean
    message: string
    errors: string[]
}

export interface ITimeSeriesDataResponse extends IResponse{
    graphData: IGraphData
}

export interface IGraphData {
    columnNames: string[]
    dataRows: number[][]
}