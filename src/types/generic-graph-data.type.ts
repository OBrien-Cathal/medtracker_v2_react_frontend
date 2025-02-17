import {IDateRange, IResponse} from "./generic.type.ts";

export interface ITimeSeriesDataResponse extends IResponse {
    graphData: IGraphData
}

export interface IGraphData {
    columnNames: string[]
    dataRows: number[][]
}

export interface IGraphProps {
    patientIdOrNegative: bigint
    dateRange: IDateRange
}