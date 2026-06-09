import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ProductPeristenceModel } from "../product-persistence/product-persistence.model";
import { Booking } from "../bookings/bookings.model";
import { Customer } from "../customer/customer.model";

@Table({ tableName: 'reviews', timestamps: true })
export class Review extends Model<Review> {
    
    @Column({
        type:DataType.INTEGER,
        field:'id',
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ForeignKey(()=>Customer)
    @Column({
        type:DataType.INTEGER,
        field:'customer_id',
        unique:true
    })
    customerId:number;
    @BelongsTo(()=>Customer)
    customer:Customer

    @ForeignKey(()=>ProductPeristenceModel)
    @Column({
        type:DataType.INTEGER,
        field:'product_id'
    })
    productId:number;
    @BelongsTo(()=>ProductPeristenceModel)
    product:ProductPeristenceModel;

    @ForeignKey(()=>Booking)
    @Column({
        type:DataType.INTEGER,
        field:'booking_id',
        unique:true
    })
    bookingId:number;
    @BelongsTo(()=>Booking)
    booking:Booking

    @Column({
        type:DataType.INTEGER,
        field:'rating'
    })
    rating:number;

    @Column({
        type:DataType.STRING,
        field:'review_text'
    })
    reviewText:string;
}