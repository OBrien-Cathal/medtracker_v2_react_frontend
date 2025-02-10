import AuthenticatedService from "./authenticatedService.tsx";
import {ITimeSeriesDataResponse} from "../types/generic-graph-data.type.ts";
import {
    IBloodPressureDataRequestResponse,
    IAddDatedBloodPressureDataRequest,
    IAddDatedBloodPressureDataRequestResponse
} from "../types/blood-pressure.type.ts";
import {IDateRange} from "../types/generic.type.ts";

export class BloodPressureService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/blood-pressure");
    }

    getSystoleGraphData(dateRange: IDateRange) {
        return this._client.post<ITimeSeriesDataResponse>(
            "/systole-graph-data",
            dateRange);
    }

    getPractitionerPatientSystoleGraphData(patientId: bigint, dateRange: IDateRange) {
        return this._client.post<ITimeSeriesDataResponse>("/systole-graph-data/patient", {...dateRange, patientId,});
    }

    getSystoleGraphDataForId(patientId: bigint, dateRange: IDateRange) {
        if (patientId > 0) {
            return this.getPractitionerPatientSystoleGraphData(patientId, dateRange)
        } else return this.getSystoleGraphData(dateRange)
    }   
    
    
    
    getDiastoleGraphData(dateRange: IDateRange) {
        return this._client.post<ITimeSeriesDataResponse>(
            "/diastole-graph-data",
            dateRange);
    }

    getPractitionerPatientDiastoleGraphData(patientId: bigint, dateRange: IDateRange) {
        return this._client.post<ITimeSeriesDataResponse>("/diastole-graph-data/patient", {...dateRange, patientId,});
    }

    getDiastoleGraphDataForId(patientId: bigint, dateRange: IDateRange) {
        if (patientId > 0) {
            return this.getPractitionerPatientDiastoleGraphData(patientId, dateRange)
        } else return this.getDiastoleGraphData(dateRange)
    }   
    
    
    
    getHeartRateGraphData(dateRange: IDateRange) {
        return this._client.post<ITimeSeriesDataResponse>(
            "/heart-rate-graph-data",
            dateRange);
    }

    getPractitionerPatientHeartRateGraphData(patientId: bigint, dateRange: IDateRange) {
        return this._client.post<ITimeSeriesDataResponse>("/heart-rate-graph-data/patient", {...dateRange, patientId,});
    }

    getHeartRateGraphDataForId(patientId: bigint, dateRange: IDateRange) {
        if (patientId > 0) {
            return this.getPractitionerPatientHeartRateGraphData(patientId, dateRange)
        } else return this.getHeartRateGraphData(dateRange)
    }

    getBloodPressureDailyData(date: string) {
        let dateString = date.toString();
        console.log(dateString)
        return this._client.post<IBloodPressureDataRequestResponse>(
            "/blood-pressure-daily-data",
            {date: dateString});
    }

    addBloodPressureDailyData(data: IAddDatedBloodPressureDataRequest) {
        return this._client.post<IAddDatedBloodPressureDataRequestResponse>(
            "/add-blood-pressure-daily-data",
            data);
    }


}