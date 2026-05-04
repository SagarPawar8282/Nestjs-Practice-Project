import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Booking } from "../bookings/bookings.model";

@Table({tableName:'booking_order_details'})
export class BookingOrderDetailsModel extends Model<BookingOrderDetailsModel>{

    @Column({
        type:DataType.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    })
    id:number;

    @Column({
        type:DataType.STRING,
        field:'details'
    })
    details:string;

    @ForeignKey(()=>Booking)
    @Column({
        type:DataType.INTEGER,
        field:'booking_id'
    })
    bookingId:number;
    @BelongsTo(()=>Booking)
    booking:Booking;
}