import http from "../service/http-client";

class AuthenticationRegistrationService {
    private _authPath: string = "/auth/account-registration";

    confirmRegistration(id: string, regId: string) {
        return http.get<string>(this._authPath + "/confirm?reg=" + regId +
            "&user-id=" + id);
    }
}

export default new AuthenticationRegistrationService();
