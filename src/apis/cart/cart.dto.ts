import { IsDefined, IsNumber } from "class-validator";

export class CreateCartDto{
    @IsNumber()
    @IsDefined()
    customerId:number;

    @IsNumber()
    @IsDefined()
    productId:number;

    @IsNumber()
    @IsDefined()
    quantity:number;
}

export class UpdateCartDto {
    @IsNumber()
    quantity?:number;
}