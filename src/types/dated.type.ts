import {IResponse} from "./generic.type.ts";

export interface IDatedDataRequest{
    date: string
}

export interface IDatedDataResponse extends IResponse{
    date: string
}