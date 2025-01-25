import {IResponse} from "./generic.type.ts";

export interface ITimeSeriesDataRequest {
    beginDate: string
    endDate: string
}

export interface ITimeSeriesDataResponse extends IResponse{
    graphData: IGraphData
}

export interface IGraphData {
    columnNames: string[]
    dataRows: number[][]
}