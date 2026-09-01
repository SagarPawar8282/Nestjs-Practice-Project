import { SchedulesModel } from "./schedules.model"

export const SCHEDULES_REPOSITORY='SCHEDULES_REPOSITORY'

export const SchedulesRepositoyProvider={
    provide:SCHEDULES_REPOSITORY,
    useValue:SchedulesModel
}