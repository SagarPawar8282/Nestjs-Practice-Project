import { IsDefined, IsString } from "class-validator";

export class BookingAddressDetailsDto{
    
    @IsString()
    @IsDefined()
    lane:string;

    @IsString()
    @IsDefined()
    city:string;

    @IsString()
    @IsDefined()
    state:string;
}