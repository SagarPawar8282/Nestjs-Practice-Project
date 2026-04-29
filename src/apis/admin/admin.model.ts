import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "../users/users.model";

@Table({tableName:'admin', timestamps:true})
export class Admin extends Model<Admin>{

    @Column({
        type:DataType.STRING,
        field:'name'
    })
    name:string;

    @ForeignKey(()=>Users)
    @Column({
        type:DataType.INTEGER,
        field:'user_id',
    })
    userId:number;
    @BelongsTo(()=>Users)
    users:Users
}