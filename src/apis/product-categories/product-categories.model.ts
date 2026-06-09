import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ProductPeristenceModel } from "../product-persistence/product-persistence.model";

@Table({tableName:'product_category',timestamps:true})
export class ProductCategory extends Model<ProductCategory>{

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
        field:'product_category'
    })
    productCategory:string;

    @HasMany(()=>ProductPeristenceModel)
    product:ProductPeristenceModel

    

}