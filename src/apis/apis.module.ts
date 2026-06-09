//buisness module here all the logic reside here

import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from "./product/product.module";
import { AdminModule } from "./admin/admin.module";
import { BookingsModule } from "./bookings/bookings.module";
import { BookingOrderDetailsModule } from "./booking-order-details/booking-order-details.module";
import { CartModule } from "./cart/cart.module";
import { BookingAddressDetailsModule } from "./booking-address-details/booking-address-details.module";
import { ProductCategoriesModule } from "./product-categories/product-categories.module";
import { ReviewsModule } from './reviews/reviews.module';
import { ProductDimensionsModule } from "./product-dimensions/product-dimensions.module";
@Module({
    imports:[
        CustomerModule, RolesModule, UsersModule, StoreModule,ProductModule,AdminModule,BookingsModule,
        BookingOrderDetailsModule,CartModule,BookingAddressDetailsModule,ProductCategoriesModule, ReviewsModule,
        ProductDimensionsModule
    ],
})export class ApisModules{}
