//core module means app infrastructe module

import { Module } from "@nestjs/common";
import { canConfigModule } from "./config/config.module";
import { AuthModule } from './auth/auth.module';
import { QueueProcessorModule } from "./queue-processor/queue-processor.module";
import { AdminModule } from "src/apis/admin/admin.module";

@Module({
    imports:[canConfigModule, AuthModule,QueueProcessorModule,AdminModule],
    providers:[],
    exports:[canConfigModule],
})export class CoreModule {}