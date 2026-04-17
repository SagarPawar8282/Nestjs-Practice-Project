import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}

export class LoginResponseDto {
    token: string;
    type: 'Bearer';
}