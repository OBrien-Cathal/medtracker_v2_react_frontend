import http from "../service/http-client";
import {
    IAuthenticationResponse,
    IAuthenticationRequest,
    IAuthenticationVerificationRequest, IAccountVerificationResponse, IAuthenticationVerificationResponse
} from "../types/authentication.type";

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

    checkAccountExists(data: IAuthenticationRequest) {
        return http.post<IAccountVerificationResponse>(this._authPath + "/checkaccount", data);
    }
}

export default new AuthenticationDataService();
