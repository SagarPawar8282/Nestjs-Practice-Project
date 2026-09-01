import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesRepositoyProvider } from './schedules.Repository';

@Module({
  imports:[],
  controllers: [SchedulesController],
  providers: [SchedulesService,SchedulesRepositoyProvider],
  exports:[SchedulesService]
})
export class SchedulesModule {}
