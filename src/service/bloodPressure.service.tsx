import AuthenticatedService from "./authenticatedService.tsx";
import {ITimeSeriesDataResponse} from "../types/generic-graph-data.type.ts";

export class BloodPressureService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/blood-pressure");
    }

    getSystoleGraphData() {
        return this._client.get<ITimeSeriesDataResponse>("/systole-graph-data");
    }

    getPractitionerPatientSystoleGraphData(patientId: bigint) {
        return this._client.get<ITimeSeriesDataResponse>("/systole-graph-data/patient?id=" + patientId);
    }


}