import { Injectable } from "@nestjs/common";
import { ICanDataSourceConfig, IDataSourceConfigurationAttributes } from "./datasource.config.interface";
import {ConfigService} from "@nestjs/config" 
import { MODELS } from "src/include.model";

@Injectable()
export class CanDataSourceConfig implements ICanDataSourceConfig{
    constructor(private consfigService:ConfigService){}

    get dataSourceConfiguration():IDataSourceConfigurationAttributes{
        return {
            dialect:this.consfigService.get('DB_DIALECT') as any,   //pg
            host:this.consfigService.get('DB_HOST'),                //localhost
            port:this.consfigService.get('DB_PORT'),                //3000
            username:this.consfigService.get('DB_USERNAME'),        //username
            password:this.consfigService.get('DB_PASSWORD'),        //password
            database:this.consfigService.get('DB_DATABASE'),        //db_name
            logging:this.consfigService.get('DB_LOGS') === 'false',
            sync:{alter:this.consfigService.get('DB_SYNC_ALTER') === 'true'},
            models:[...MODELS],
            pool:{
                max:10,
                min:0,
                acquire:30000,
                idle:10000
            }
        }
    }
}