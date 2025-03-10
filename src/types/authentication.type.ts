import {IResponse} from "./generic.type.ts";

export interface IAuthenticationResponse extends IResponse{
    token: string
    message: string
    username: string
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




