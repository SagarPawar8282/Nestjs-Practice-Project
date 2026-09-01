import { Body, Controller, Delete, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesDto } from './schedules.dto';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(RoleGuard)
  @Roles('Admin')
  @Post()
  async jobSchedules(@Body()schedulesBody:SchedulesDto){
    const jobResult=await this.schedulesService.AddSchedules(schedulesBody);
    return jobResult;
  }

  @UseGuards(RoleGuard)
  @Roles('Admin')
  @Delete()
  async removeSheduler(@Query('type')type:string){
      const removeCron =await this.schedulesService.removeSheduler(type);
      return removeCron;
  }

  @UseGuards(RoleGuard)
  @Roles('Admin')
  @Put('pause')
  async pauseSchedule(@Body()pauseBody:any){
      const pauseCron = await this.schedulesService.pauseSchedule(pauseBody?.type);
      return pauseCron
  }

  @UseGuards(RoleGuard)
  @Roles('Admin')
  @Put('resume')
  async resumeSchedule(@Body()resumeBody:any){
      const resumeCron = await this.schedulesService.resumeSchedule(resumeBody?.type);
      return resumeCron;
  }

  @UseGuards(RoleGuard)
  @Roles('Admin')
  @Put()
  async updateSchedules(@Body()schedulesBody:SchedulesDto){
    const updatedCron =await this.schedulesService.updateSchedules(schedulesBody)
  }
}
