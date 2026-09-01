import { Model, ModelCtor } from "sequelize-typescript";
import { Customer } from "./apis/customer/customer.model";
import { Users } from "./apis/users/users.model";
import { Store } from "./apis/store/store.model";
import { Roles } from "./apis/roles/roles.model";
import { ProductPeristenceModel } from "./apis/product-persistence/product-persistence.model";
import { Admin } from "./apis/admin/admin.model";
import { Booking } from "./apis/bookings/bookings.model";
import { BookingOrderDetailsModel } from "./apis/booking-order-details/booking-order-details.model";
import { CartModel } from "./apis/cart/cart.model";
import { BookingAddressDetails } from "./apis/booking-address-details/booking-address-details.model";
import { ProductCategory } from "./apis/product-categories/product-categories.model";
import { Review } from "./apis/reviews/reviews.model";
import { ProductDimension } from "./apis/product-dimensions/product-dimensions.model";
import { Chat } from "./apis/chat/chat.model";
import { SchedulesModel } from "./apis/schedules/schedules.model";
//import { Product } from "./apis/product/product.model";


export const MODELS: ModelCtor<Model<any,any>>[]=[
    Roles,
    Customer,
    Store,
    Users,
    Admin,
   // Product,
   ProductPeristenceModel,
   Booking,
   BookingOrderDetailsModel,
   CartModel,
   BookingAddressDetails,
   ProductCategory,
   Review,
   ProductDimension,
   Chat,
   SchedulesModel
]