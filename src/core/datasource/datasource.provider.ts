import { Sequelize } from "sequelize-typescript";
import { SEQUELIZE_DATABASE_PROVIDER } from "../constants/app.constants";
import { CanDataSourceConfig } from "./datasource.config";

export const CAN_DATASOURCE_PROVIDER =[
    {
        provide: SEQUELIZE_DATABASE_PROVIDER,
        useFactory: async (canDataSourceConfig:CanDataSourceConfig)=>{
            const sequelize = new Sequelize({
                ...canDataSourceConfig.dataSourceConfiguration
            });
            await sequelize.sync();     //create table if not exits or update schema
            return sequelize;
        },
        inject:[CanDataSourceConfig],       //Before running factory, give me this dependency
    }
]