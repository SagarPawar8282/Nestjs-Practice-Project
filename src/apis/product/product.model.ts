/**
 * NOTE:
 * Store model and repository have been moved to PersistenceModule.
 *
 * Reason:
 * - To avoid circular dependency between StoreModule and QueueModule
 * - To centralize all database access logic
 *
 * Please refer to: /modules/persistence
 */




// import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
// import { Store } from "../store/store.model";

// @Table({tableName:'product',timestamps:true})
// export class Product extends Model<Product>{

//     @Column({
//         type:DataType.INTEGER,
//         field:'id',
//         autoIncrement: true,
//         unique: true,
//         primaryKey: true,
//     })
//     id:number;
    
//     @Column({
//         type:DataType.STRING,
//         field:'name'
//     })
//     name:string;

//     @Column({
//         type:DataType.STRING,
//         field:'product-category'
//     })
//     productCategory:string;
    
//     @Column({
//         type:DataType.STRING,
//         field:'description'
//     })
//     description:string;
    
//     @Column({
//         type:DataType.STRING,
//         field:'price'
//     })
//     price:number;
    
//     @Column({
//         type:DataType.STRING,
//         field:'stock'
//     })
//     stock:number;
    
//     @ForeignKey(()=>Store)
//     @Column({
//         type:DataType.INTEGER,
//         field:'store_id'
//     })
//     storeId:number;
//     @BelongsTo(()=>Store)
//     store:Store;
// }