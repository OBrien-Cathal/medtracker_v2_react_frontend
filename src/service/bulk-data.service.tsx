import AuthenticatedService from "./authenticatedService.tsx";
import {IResponse} from "../types/generic.type.ts";
import {AxiosInstance} from "axios";


export class BulkDataService extends AuthenticatedService {
    protected _downloadClient: AxiosInstance

    constructor(token: string) {
        super(token, BulkDataService.getPath());
        this._downloadClient = this.createDownloadClient(BulkDataService.getPath())
    }


    private static getPath() {
        return "/bulk-data";
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

    downloadBloodPressureFile() {
        return this._downloadClient.get("/blood-pressure-download")
    }

    downloadDoseFile() {
        return this._downloadClient.get("/dose-download")
    }

    archiveToEmail() {
        return this._client.get("/archive")
    }
}