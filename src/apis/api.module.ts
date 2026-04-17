import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { StoreModule } from './store/store.module';

@Module({
    imports:[CustomerModule, RolesModule, UsersModule, StoreModule],
})export class ApiModules{}
