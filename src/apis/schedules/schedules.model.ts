import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName:'schedules',timestamps:true})
export class SchedulesModel extends Model<SchedulesModel>{
    @Column({
        type:DataType.INTEGER,
        field:'id',
        unique:true,
        primaryKey:true,
        autoIncrement:true
    })
    id:number;

    @Column({
        type:DataType.STRING,
        field:'type'
    })
    type:string;
    
    @Column({
        type:DataType.STRING,
        field:'cron_Expression'
    })
    cronExpression:string;
    
    @Column({
        type:DataType.STRING,
        field:'timezone'
    })
    timezone:string;

    @Column({
        type:DataType.STRING,
        field:'status'
    })
    status:string;
}