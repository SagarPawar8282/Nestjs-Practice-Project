import { Model, ModelCtor } from "sequelize-typescript";
import { Customer } from "./apis/customer/customer.model";
import { Users } from "./apis/users/users.model";
import { Store } from "./apis/store/store.model";
import { Roles } from "./apis/roles/roles.model";
import { ProductPreristenceModel } from "./apis/product-persistence/product-persistence.model";
//import { Product } from "./apis/product/product.model";


export const MODELS: ModelCtor<Model<any,any>>[]=[
    Roles,
    Customer,
    Store,
    Users,
   // Product,
   ProductPreristenceModel
]