import AuthenticatedService from "./authenticatedService.tsx";
import {IResponse} from "../types/generic.type.ts";

export class BulkDataService extends AuthenticatedService {
    constructor(token: string) {
        super(token, "/bulk-data");
    }


    uploadDoseFile(file: FormData) {
        return this._client.post<IResponse>(
            "/dose-upload",
            file,
            {
                headers: {
                    "Authorization": 'Bearer ' + this._token,
                    "Content-type": "multipart/form-data",
                },
            }
        );
    }

    uploadBloodPressureFile(file: FormData) {
        return this._client.post<IResponse>(
            "/blood-pressure-upload",
            file,
            {
                headers: {
                    "Authorization": 'Bearer ' + this._token,
                    "Content-type": "multipart/form-data",
                },
            }
        );
    }


}