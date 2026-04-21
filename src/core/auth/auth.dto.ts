import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { IsNumeric } from "sequelize-typescript";

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

export class CustomerRegisterDto{

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsStrongPassword()
    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsString()
    @IsNotEmpty()
    address:string;

    @IsString()
    @IsNotEmpty()
    phoneNumber:string;
}

export class storeRegisterDto{

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsStrongPassword()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    address:string;

    @IsString()
    @IsNotEmpty()
    storeType:string;

    @IsBoolean()
    @IsNotEmpty()
    isOpen:boolean;

}