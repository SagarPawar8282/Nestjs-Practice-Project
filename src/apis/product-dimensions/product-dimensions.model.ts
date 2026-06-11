import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { ProductPeristenceModel } from "../product-persistence/product-persistence.model";

@Table({tableName:'product_dimensions',timestamps:true})
export class ProductDimension extends Model<ProductDimension>{

    @Column({
        type:DataType.INTEGER,
        field:'id',
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id:number;

    @Column({
        type:DataType.INTEGER,
        field:'height'
    })
    height:number;

    @Column({
        type:DataType.INTEGER,
        field:'width'
    })
    width:number;

    @Column({
        type:DataType.INTEGER,
        field:'length'
    })
    length:number;

    @Column({
        type:DataType.STRING,
        field:'shape'
    })
    shape:string;

    @Column({
        type:DataType.INTEGER,
        field:'quantity'
    })
    quantity:number;

    @Column({
        type:DataType.INTEGER,
        field:'weight'
    })
    weight:number;

    @Column({
        type:DataType.STRING,
        field:'color'
    })
    color:string

    @HasOne(()=>ProductPeristenceModel)
    product:ProductPeristenceModel
}