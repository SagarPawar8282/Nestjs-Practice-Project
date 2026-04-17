import { SequelizeOptions} from "sequelize-typescript";

export interface ICanDataSourceConfig {
    dataSourceConfiguration:IDataSourceConfigurationAttributes; 
} 
export interface IDataSourceConfigurationAttributes extends SequelizeOptions{}