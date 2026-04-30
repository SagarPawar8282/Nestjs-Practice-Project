import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Users } from "../users/users.model";
import { ProductPeristenceModel } from "../product-persistence/product-persistence.model";

@Table({tableName:'store',timestamps:true})
export class Store extends Model<Store> {

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
        field: 'store_type'
    })
    storeType: string;

    @Column({
        type: DataType.BOOLEAN,
        field: 'is_open'
    })
    isOpen: boolean

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        field: 'user_id',
        allowNull:false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })
    userId: number;
    @BelongsTo(() => Users)
    users: Users;

    @HasMany(()=>ProductPeristenceModel)
    product:ProductPeristenceModel
}