import { Users } from "./users.model"

export const USER_REPOSITORY = 'USER_REPOSITORY'

export const userRespositoryProvider = {
    provide:USER_REPOSITORY,
    useValue:Users
}