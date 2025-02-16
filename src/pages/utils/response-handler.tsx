import Swal from "sweetalert2";
import {AxiosResponse} from "axios";
import {IResponse} from "../../types/generic.type.ts";

export type RequestStatusType = {
    succeeded: boolean
}

class ResponseHandler {
    private readonly _notify: boolean = false

    constructor(notify: boolean) {
        this._notify = notify;
    }


    public handleResponse(response: AxiosResponse<IResponse>): RequestStatusType {
        if (response.data.responseInfo.successful) {
            if (this._notify) {
                Swal.fire({
                    title: "Success",
                    text: response.data.responseInfo.message,
                    icon: "success"
                }).then()
            }
            return {succeeded: true}
        } else {
            console.log(response.data.responseInfo.message)
            console.log(response.data.responseInfo.errors)
            Swal.fire("ERROR!", response.data.responseInfo.errors.join("\n"), "error").then()
            return {succeeded: false}
        }
    }

    public handleError(e: any) {
        console.log(e.error)
        Swal.fire("ERROR!", e.error, "error").then()
    }
}

export const handleResponse = (requestResponse: AxiosResponse<IResponse, any>) => {
    new ResponseHandler(false).handleResponse(requestResponse)
}
export const handleResponseAndNotify = (requestResponse: AxiosResponse<IResponse, any>) => {
    new ResponseHandler(true).handleResponse(requestResponse)
}
export const handleError = (error: any) => {
    new ResponseHandler(true).handleError(error)
}
