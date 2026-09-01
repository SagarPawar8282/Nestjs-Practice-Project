import { Socket } from "socket.io";

export interface JwtUser{
    id:number,
    email:string,
    role:string,
    iat:number,
    exp:number
}

export interface AuthenticatedSocket extends Socket {
    user:JwtUser
}