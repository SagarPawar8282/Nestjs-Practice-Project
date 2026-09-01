import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { SCHEDULES_REPOSITORY } from './schedules.Repository';
import { SchedulesModel } from './schedules.model';
import { SchedulesDto } from './schedules.dto';
import { CronJob } from "cron";
import { SchedulerRegistry } from '@nestjs/schedule';
import { where } from 'sequelize';

@Injectable()
export class SchedulesService implements OnModuleInit {

    constructor(
        @Inject(SCHEDULES_REPOSITORY) private readonly schedulesRepository: typeof SchedulesModel,
        private schedulerRegistry: SchedulerRegistry
    ) { }

    async onModuleInit() {
        try {
            const schedules = await this.schedulesRepository.findAll({ where: { status: 'ACTIVE' } });

            for (const schedule of schedules) {
                const prevJob = await this.createCron(schedule?.cronExpression, schedule?.timezone, schedule?.type);

                await this.schedulerRegistry.addCronJob(schedule?.type, prevJob);
                prevJob.start();
            }
        } catch (err) {
            console.log("error: " + err);
            throw new Error(err);
        }
    }

    async sheduleWork(type: string) {
        console.log("Cron job executed");
        console.log(`[CRON RUN] ${type} executed at ${new Date().toISOString()}`);
    }

    async createCron(cronExpression: string, timezone: string, type: string) {
        const callback = () => this.sheduleWork(type);
        const cron = new CronJob(cronExpression, callback, null, false, timezone);
        return cron;
    }

    async AddSchedules(schedulesBody: SchedulesDto) {
        try {
            const dbRecord = await this.schedulesRepository.create(schedulesBody);

            //const callback = () => this.sheduleWork(schedulesBody.type)
            //const job = new CronJob(schedulesBody.cronExpression, callback, null, false, schedulesBody.timezone);
            const name = `schedule-${dbRecord.id}`
            const job = await this.createCron(schedulesBody.cronExpression, schedulesBody.timezone, name);

            await this.schedulerRegistry.addCronJob(name, job);

            job.start();
            console.log('cron job created successfully');

            await this.schedulesRepository.update({ type: name }, { where: { id: dbRecord.id } });
            return true;

        } catch (err) {
            console.error("err" + err);
            throw new Error(err);
        }
    }

    async updateSchedules(scheduleBody: SchedulesDto) {
        try {
            const isPresent = await this.schedulesRepository.findOne({ where: { type: scheduleBody.type } });

            if (isPresent) {
                const dbCron = await this.schedulesRepository.update(
                    { cronExpression: scheduleBody.cronExpression },
                    { where: { type: scheduleBody.type } })

                const isExits = await this.schedulerRegistry.doesExist('cron', scheduleBody.type);

                if (isExits) {
                    await this.schedulerRegistry.deleteCronJob(scheduleBody.type);
                }

                const newCron = await this.createCron(scheduleBody.cronExpression, scheduleBody.timezone, scheduleBody.type)

                await this.schedulerRegistry.addCronJob(scheduleBody.type, newCron);
                newCron.start();

                console.log('cron job updated successfully')
                return `${scheduleBody.type} is successfully schedule at new time`;

            }
            else {
                return `Thier is no sheduler with name: ${scheduleBody.type}`
            }

        } catch (err) {
            console.log("error : " + err);
            throw new Error(err);
        }
    }

    async removeSheduler(type: string) {
        try {
            const isPresent = await this.schedulesRepository.findOne({ where: { type: type } });

            if (isPresent) {
                const dbCron = await this.schedulesRepository.destroy({ where: { type: type } });

                const isExits = await this.schedulerRegistry.doesExist('cron', type);
                if (isExits) {
                    const regCron = await this.schedulerRegistry.deleteCronJob(type);
                }
                console.log('cron job deleted successfully')
                return `Scheduler ${type} remove successfully`;
            } else {
                return `Thier is no sheduler with name: ${type}`;
            }
        } catch (err) {
            console.log("err: " + err)
            throw new Error(err);
        }
    }

    async pauseSchedule(name:string) {
        try {
            const dbCron = await this.schedulesRepository.findOne({ where: { type: name } });
            if (dbCron) {
                await this.schedulesRepository.update({ status: 'PAUSED' }, { where: { type: name } });
            }

            const cronJobs = this.schedulerRegistry.getCronJobs();

            if (cronJobs.has(name)) {
                const job = cronJobs.get(name);
                job.stop();

                console.log(`Scheduler '${name}' paused`);
            }

            return `Scheduler '${name}' paused`;
        } catch (err) {
            console.log("error: " + err);
            throw new Error(err);
        }
    }

    async resumeSchedule(name:string){
        try{
            const dbCron = await this.schedulesRepository.findOne({where:{type:name}});

            if(dbCron){
                await this.schedulesRepository.update({status:'ACTIVE'},{where:{type:name}});
            }

            const cronJob= await this.schedulerRegistry.getCronJobs();

            if(cronJob.has(name)){
                const job= cronJob.get(name);
                job.start();

                console.log(`Scheduler '${name}' resumed`);
            }
            return `Scheduler '${name}' resumed`;
        }catch(err){
            console.log("error: "+err);
            throw new Error(err);
        }
    }
}
