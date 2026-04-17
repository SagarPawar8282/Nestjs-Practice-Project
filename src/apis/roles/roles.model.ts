import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'roles', timestamps: true })
export class Roles extends Model<Roles> {

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
    name: string
}