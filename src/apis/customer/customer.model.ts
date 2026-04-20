import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Users } from "../users/users.model";

@Table({ tableName: 'customer', timestamps: false })
export class Customer extends Model<Customer> {

    @Column({
        type: DataType.INTEGER,
        field: 'id',
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        field: 'name'
    })
    name: string;

    @Column({
        type: DataType.STRING,
        field: 'address'
    })
    address: string;

    @Column({
        type: DataType.STRING,
        field: 'phone_number'
    })
    phoneNumber: string;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        field: 'user_id'
    })
    userId: number;
    @BelongsTo(() => Users)
    users: Users

}