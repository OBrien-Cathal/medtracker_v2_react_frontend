import http from "../service/http-client";
import {
    IAuthenticationResponse,
    IAuthenticationRequest,
    IAuthenticationVerificationRequest, IAuthenticationVerificationResponse
} from "../types/authentication.type.ts";

class AuthenticationDataService {
    private _authPath: string = "/auth";

    signUp(data: IAuthenticationRequest) {
        return http.post<IAuthenticationResponse>(this._authPath + "/signup", data);
    }

    signIn(data: IAuthenticationRequest) {
        return http.post<IAuthenticationResponse>(this._authPath + "/signin", data);
    }
    verifyAuthentication(data: IAuthenticationVerificationRequest) {
        return http.post<IAuthenticationVerificationResponse>(this._authPath + "/verify", data);
    }
}

export default new AuthenticationDataService();
