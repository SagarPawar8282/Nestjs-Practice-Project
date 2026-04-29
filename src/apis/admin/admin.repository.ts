import { Admin } from "./admin.model"

export const ADMIN_REPOSITORY = 'ADMIN_REPOSITORY'

export const AdminRepositoryProvider = {
    provide:ADMIN_REPOSITORY,
    useValue:Admin
}