import { IsDefined, IsNumber, IsString } from "class-validator";

export class OrderAcceptOrRejectDto {

    @IsNumber()
    @IsDefined()
    id: number;

    @IsNumber()
    @IsDefined()
    bookingId: number;

    @IsString()
    @IsDefined()
    bookingStatus: string;

    @IsString()
    @IsDefined()
    details: string;
}