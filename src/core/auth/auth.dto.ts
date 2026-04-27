import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class EmailPasswordDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}

export class BaseDto extends EmailPasswordDto{

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsString()
    @IsNotEmpty()
    address:string;

}
export class LoginDto extends EmailPasswordDto {

}


export class CustomerRegisterDto extends BaseDto{

    @IsString()
    @IsNotEmpty()
    phoneNumber:string;
}

export class StoreRegisterDto extends BaseDto{

    @IsString()
    @IsNotEmpty()
    storeType:string;

    @IsBoolean()
    @IsNotEmpty()
    isOpen:boolean;

}