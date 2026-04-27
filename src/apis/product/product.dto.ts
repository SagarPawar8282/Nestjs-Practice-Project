import { PartialType } from "@nestjs/mapped-types";
import { ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

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


export class BulkAddProductDto{
    
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    storeId:number;

    @IsArray()
    @ArrayNotEmpty()
    productDetails;
}

export class UpdateProductDto extends PartialType(AddSingleProductDto){}