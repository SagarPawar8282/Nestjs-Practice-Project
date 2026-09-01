import { Controller, Post } from "@nestjs/common";

@Controller('report')
export class ReportController{
    constructor(){}

    @Post('set-schedular')
    async setSchedular(){
        
    }
}