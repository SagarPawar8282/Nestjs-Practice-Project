import { Module } from "@nestjs/common";
import { QueryService } from "./query.service";
import { CanDataSourceModule } from "../datasource/datasource.module";

@Module({
    imports: [CanDataSourceModule],
    providers: [QueryService],
    exports: [QueryService],
}) export class QueryModule { }