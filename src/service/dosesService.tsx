import AuthenticatedService from "./authenticatedService.tsx";
import {ITimeSeriesDataResponse} from "../types/generic-graph-data.type.ts";

export class DosesService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/doses");
    }

    getDoseGraphData() {
        return this._client.get<ITimeSeriesDataResponse>("/graph-data");
    }

    getPractitionerPatientDoseGraphData(patientId: bigint) {
        return this._client.get<ITimeSeriesDataResponse>("/graph-data/patient?id=" + patientId);
    }

    getDoseGraphDataForId(patientId: bigint) {
        if (patientId > 0) {
            return this.getPractitionerPatientDoseGraphData(patientId)
        } else return this.getDoseGraphData()
    }


}