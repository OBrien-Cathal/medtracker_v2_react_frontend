import AuthenticatedService from "./authenticatedService.tsx";
import {ITimeSeriesDataResponse} from "../types/generic-graph-data.type.ts";
import {
    IAddDailyDoseDataRequest,
    IAddDailyDoseDataRequestResponse,
    IDailyDoseDataRequestResponse
} from "../types/dose.type.ts";
import {IDateRange} from "../types/generic.type.ts";

export class DosesService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/doses");
    }

    getDoseGraphData(dateRange: IDateRange) {
        return this._client.post<ITimeSeriesDataResponse>("/graph-data", dateRange);
    }

    getPractitionerPatientDoseGraphData(patientId: bigint, dateRange: IDateRange) {
        return this._client.post<ITimeSeriesDataResponse>("/graph-data/patient", {...dateRange, patientId,});
    }

    getDoseGraphDataForId(patientId: bigint, dateRange: IDateRange) {
        if (patientId > 0) {
            return this.getPractitionerPatientDoseGraphData(patientId, dateRange)
        } else return this.getDoseGraphData(dateRange)
    }


    getDailyDoseData(date: string) {
        let dateString = date.toString();
        return this._client.post<IDailyDoseDataRequestResponse>(
            "/daily-dose-data",
            {date: dateString});
    }

    addDailyDoseData(data: IAddDailyDoseDataRequest) {
        console.log(data)
        return this._client.post<IAddDailyDoseDataRequestResponse>(
            "/add-daily-dose-data",
            data);
    }


}