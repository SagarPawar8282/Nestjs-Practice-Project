import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Customer } from "../customer/customer.model";
import { ProductPeristenceModel } from "../product-persistence/product-persistence.model";

@Table({tableName:'cart',timestamps:true})
export class CartModel extends Model<CartModel>{

    @Column({
        type: DataType.INTEGER,
        field: 'id',
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id:number;

    @Column({
        type:DataType.INTEGER,
        field:'quantity'
    })
    quantity:number;

    @ForeignKey(()=>Customer)
    @Column({
        type:DataType.INTEGER,
        field:'customer_id'
    })
    customerId:number;
    @BelongsTo(()=>Customer)
    customer:Customer;

    @ForeignKey(()=>ProductPeristenceModel)
    @Column({
        type:DataType.INTEGER,
        field:'product_id'
    })
    productId:number;
    @BelongsTo(()=>ProductPeristenceModel)
    product:ProductPeristenceModel;
}