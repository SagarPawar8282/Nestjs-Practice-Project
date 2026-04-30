import { Model, ModelCtor } from "sequelize-typescript";
import { Customer } from "./apis/customer/customer.model";
import { Users } from "./apis/users/users.model";
import { Store } from "./apis/store/store.model";
import { Roles } from "./apis/roles/roles.model";
import { ProductPeristenceModel } from "./apis/product-persistence/product-persistence.model";
import { Admin } from "./apis/admin/admin.model";
import { Booking } from "./apis/bookings/bookings.model";
//import { Product } from "./apis/product/product.model";


export const MODELS: ModelCtor<Model<any,any>>[]=[
    Roles,
    Customer,
    Store,
    Users,
    Admin,
   // Product,
   ProductPeristenceModel,
   Booking
]