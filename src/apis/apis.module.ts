import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from "./product/product.module";
import { AdminModule } from "./admin/admin.module";

@Module({
    imports:[CustomerModule, RolesModule, UsersModule, StoreModule,ProductModule,AdminModule],
})export class ApisModules{}
