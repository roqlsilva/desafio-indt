import { LoginPayloadType } from "../../models/auth/login.interface";
import { requests } from "../api";

export const Auth = {
    signIn: (payload: LoginPayloadType) => requests.post('auth/login', payload),
}