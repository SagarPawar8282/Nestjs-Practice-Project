import { Module } from "@nestjs/common";
import { canConfigModule } from "./config/config.module";
import { AuthModule } from './auth/auth.module';

@Module({
    imports:[canConfigModule, AuthModule],
    providers:[],
    exports:[canConfigModule],
})export class CoreModule {}