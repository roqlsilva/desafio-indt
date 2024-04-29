export interface LoginResponseType {
    id: string;
    name: string;
    email: string;
    access_token: string;
}

export interface LoginPayloadType {
    username: string;
    password: string;
}