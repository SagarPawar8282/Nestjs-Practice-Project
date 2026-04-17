import { Model, ModelCtor } from "sequelize-typescript";
import { Customer } from "./apis/customer/customer.model";
import { Users } from "./apis/users/users.model";
import { Store } from "./apis/store/store.model";
import { Roles } from "./apis/roles/roles.model";


export const MODELS: ModelCtor<Model<any,any>>[]=[
    Roles,
    Customer,
    Store,
    Users,
]