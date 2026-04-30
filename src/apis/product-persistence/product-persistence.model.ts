import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Store } from "../store/store.model";
import { Booking } from "../bookings/bookings.model";

@Table({tableName:'product',timestamps:true})
export class ProductPeristenceModel extends Model<ProductPeristenceModel>{

    @Column({
        type:DataType.INTEGER,
        field:'id',
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id:number;
    
    @Column({
        type:DataType.STRING,
        field:'name'
    })
    name:string;

    @Column({
        type:DataType.STRING,
        field:'product_category'
    })
    productCategory:string;
    
    @Column({
        type:DataType.STRING,
        field:'description'
    })
    description:string;
    
    @Column({
        type:DataType.STRING,
        field:'price'
    })
    price:number;
    
    @Column({
        type:DataType.STRING,
        field:'stock'
    })
    stock:number;
    
    @ForeignKey(()=>Store)
    @Column({
        type:DataType.INTEGER,
        field:'store_id',
        allowNull:false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })
    storeId:number;
    @BelongsTo(()=>Store)
    store:Store;

    @HasMany(()=>Booking)
    booking:Booking;
}