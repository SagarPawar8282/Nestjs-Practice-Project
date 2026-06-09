import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReviewDto{

    @IsNumber()
    @IsDefined()
    customerId:number;

    @IsNumber()
    @IsDefined()
    productId:number;

    @IsNumber()
    @IsDefined()
    bookingId:number;

    @IsNumber()
    @IsDefined()
    rating:number;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    reviewText:string
}