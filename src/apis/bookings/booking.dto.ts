import { IsBoolean, IsDefined, IsNumber, IsObject, IsString } from "class-validator";

export class BookingDto{

    @IsNumber()
    @IsDefined()
    productId:number;

    @IsNumber()
    @IsDefined()
    userId:number;

    @IsNumber()
    @IsDefined()
    quantity:number;

    @IsNumber()
    @IsDefined()
    storeId:number;

    @IsNumber()
    @IsDefined()
    totalAmount:number;

    @IsString()
    @IsDefined()
    address:string;

    @IsString()
    @IsDefined()
    city:string;

    @IsString()
    @IsDefined()
    state:string;

    @IsBoolean()
    @IsDefined()
    isPaymentSuccess:boolean;
}

