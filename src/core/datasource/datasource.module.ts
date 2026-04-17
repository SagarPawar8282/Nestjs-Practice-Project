import { Module } from "@nestjs/common";
import { CAN_DATASOURCE_PROVIDER } from "./datasource.provider";
import { CanDataSourceConfig } from "./datasource.config";

@Module({
    providers:[...CAN_DATASOURCE_PROVIDER,CanDataSourceConfig],
    exports:[...CAN_DATASOURCE_PROVIDER]
})export class CanDataSourceModule {}