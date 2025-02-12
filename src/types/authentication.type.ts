export interface IAuthenticationResponse {
    token: string
    message: string
    currentUserRole: string;
}

export interface IAuthenticationVerificationResponse {
    authenticated: boolean
}

export interface IAuthenticationVerificationRequest {
    token: string
}

export interface IAuthenticationRequest {
    password: string
    username: string
}

export interface IAuthenticatedUser {
    username: string
    token: string
    currentUserRole: string;
}






