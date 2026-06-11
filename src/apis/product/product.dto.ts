import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class AddSingleProductDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    productCategory:string;

    @IsString()
    @IsOptional()
    description:string;
    
    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    price:number;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    stock:number;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    storeId:number;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    height?:number;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    width?:number;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    length?:string;

    @IsString()
    @IsOptional()
    shape?:string;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    quantity?:number;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    weight?:number;

    @IsString()
    @IsOptional()
    color?:string;
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