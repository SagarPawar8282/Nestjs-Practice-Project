import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ProductPeristenceModel } from "../product-persistence/product-persistence.model";
import { Customer } from "../customer/customer.model";

@Table({ tableName: 'booking', timestamps: true })
export class Booking extends Model<Booking> {

    @Column({
        type: DataType.INTEGER,
        field: 'id',
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => ProductPeristenceModel)
    @Column({
        type: DataType.INTEGER,
        field: 'product_id',
        allowNull: false
    })
    productId: number;
    @BelongsTo(() => ProductPeristenceModel)
    product: ProductPeristenceModel

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
        field: 'customer_id',
        allowNull:false
    })
    customerId: number;
    @BelongsTo(() => Customer)
    customer: Customer;

    @Column({
        type: DataType.INTEGER,
        field: 'quantity'
    })
    quantity: number;

    @Column({
        type: DataType.DATEONLY,
        field: 'order_date'
    })
    orderDate: string;

    @Column({
        type:DataType.ENUM(
            'pending','complete','failed','refunded'
        ),
        field:'booking_status',
    })
    bookingStatus:string;

    @Column({
        type:DataType.ENUM(
            'pending','paid','failed','refunded'
        ),
        field:'payment_status'
    })
    paymentStatus:string;

    @Column({
        type:DataType.DECIMAL(10,2),
        field:'total_amount',
        allowNull:false
    })
    totalAmount: number;

}