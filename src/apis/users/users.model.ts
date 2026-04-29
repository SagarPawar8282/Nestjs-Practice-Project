import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Roles } from "../roles/roles.model";
import { Store } from "../store/store.model";
import { Admin } from "../admin/admin.model";
import { Customer } from "../customer/customer.model";

@Table({ tableName: 'users', timestamps: true })
export class Users extends Model<Users> {

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
        field: 'email'
    })
    email: string;

    @Column({
        type: DataType.STRING,
        field: 'password'
    })
    password: string

    @ForeignKey(() => Roles)
    @Column({
        type: DataType.INTEGER,
        field: 'role_id',
    })
    roleId: number;
    @BelongsTo(() => Roles)
    roles: Roles

    @HasOne(()=>Store)
    store:Store;

    @HasOne(()=>Admin)
    admin:Admin;

    @HasOne(()=>Customer)
    customer:Customer;
}