import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddSingleProductDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    productCategory:string;

    description:string;
    
    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsNumber()
    @IsNotEmpty()
    stock:number;

    @IsNumber()
    @IsNotEmpty()
    storeId:number;
}