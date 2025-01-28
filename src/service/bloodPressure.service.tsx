import AuthenticatedService from "./authenticatedService.tsx";
import {ITimeSeriesDataResponse} from "../types/generic-graph-data.type.ts";
import {
    IBloodPressureDataRequestResponse,
    IAddDatedBloodPressureDataRequest,
    IAddDatedBloodPressureDataRequestResponse
} from "../types/blood-pressure.type.ts";

export class BloodPressureService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/blood-pressure");
    }

    getSystoleGraphData() {
        return this._client.get<ITimeSeriesDataResponse>("/systole-graph-data");
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

    getPractitionerPatientSystoleGraphData(patientId: bigint) {
        return this._client.get<ITimeSeriesDataResponse>("/systole-graph-data/patient?id=" + patientId);
    }

    getSystoleGraphDataForId(patientId: bigint) {
        if (patientId > 0) {
            return this.getPractitionerPatientSystoleGraphData(patientId)
        } else return this.getSystoleGraphData()
    }


}