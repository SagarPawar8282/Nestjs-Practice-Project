import { IsDefined, IsNumber } from "class-validator";

export class BookingDto{

    @IsNumber()
    @IsDefined()
    productId:number;

    @IsNumber()
    @IsDefined()
    customerId:number;

    @IsNumber()
    @IsDefined()
    quantity:number;

    @IsNumber()
    @IsDefined()
    storeId:number;

    @IsNumber()
    @IsDefined()
    totalAmount:number;
}

