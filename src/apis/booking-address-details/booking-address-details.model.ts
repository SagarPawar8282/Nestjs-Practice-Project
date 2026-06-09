import { Table,Model, Column, DataType, HasOne } from "sequelize-typescript";
import { Booking } from "../bookings/bookings.model";

@Table({tableName:'booking_address_details', timestamps:true})
export class BookingAddressDetails extends Model<BookingAddressDetails>{

    @Column({
        type:DataType.INTEGER,
        field:'id',
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;
    
    @Column({
        type:DataType.STRING,
        field:'lane'
    })
    lane:string;
    
    @Column({
        type:DataType.STRING,
        field:'city'
    })
    city:string;
    
    @Column({
        type:DataType.STRING,
        field:'state'
    })
    state:string;

    @HasOne(()=>Booking)
    booking:Booking
}