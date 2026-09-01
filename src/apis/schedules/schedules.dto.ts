import { IsDefined, IsOptional, IsString } from "class-validator";

export class SchedulesDto {
    @IsOptional()
    @IsString()
    type?:string;

    @IsDefined()
    @IsString()
    cronExpression:string;

    @IsDefined()
    @IsString()
    timezone:string;

    @IsDefined()
    @IsString()
    status:string;
}