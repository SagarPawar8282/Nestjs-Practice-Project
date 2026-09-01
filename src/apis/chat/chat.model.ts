import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";


@Table({tableName:'chats',timestamps:true})
export class Chat extends Model<Chat> {

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
        field:'sender_id'
    })
    senderId:number

    @Column({
        type:DataType.INTEGER,
        field:'receiver_id'
    })
    receiverId:number

    @Column({
        type:DataType.TEXT,
        field:'message' 
    })
    message:string;

    @Column({
        type:DataType.ENUM('pending','sent','delivered','read'),
        field:'status'
    })
    status:string;

    @Column({
        type:DataType.DATE,
        field:'sent_at'
    })
    sentAt:Date;

    @Column({
        type:DataType.DATE,
        field:'delivered_at',
    })
    deliveredAt:Date;

    @Column({
        type:DataType.DATE,
        field:'read_at'
    })
    readAt:Date;
}