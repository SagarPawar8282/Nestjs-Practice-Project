import { BookingStatus } from "src/common/enum/bookingStatus.enum"
import { PaymentStatus } from "src/common/enum/paymentStatus.enum"

export class Query {
    static getAllProductCategory() {
        return `SELECT distinct(product_category)
                from product_category as p
                where p.product_category is not null;`
    }

    static checkPaymentReceivedSuccessfully(id: number) {
        return `SELECT payment_status
                from booking as b
                where b.id=${id};`
    }

    static fetchAllStoreCategories() {
        return `select distinct(store_category)
        from store as s
        where s.store_category is not null;`
    }

    static checkOrderShouldOutOfDelivery() {
        return `WITH bookingData as(
            select id,product_id,payment_status,quantity,order_date,total_amount
            from booking as b
            where b.payment_status='paid' and b.booking_status='confirmed'
            )
            INSERT INTO booking_order_details (details, booking_id, "createdAt", "updatedAt")
            SELECT NULL, bd.id, NOW(), NOW()
            FROM bookingData bd
            WHERE NOT EXISTS (
                SELECT 1
                FROM booking_order_details bod
                WHERE bod.booking_id = bd.id
            );`
    }

    static findAllProductCategoryUnderStore(storeId) {
        return `select distinct(pc.product_category)
                from product as p
                left join product_category as pc
                on pc.id = p.product_catagery_id
                where p.store_id=${storeId}`
    }

    static failedMarkForBookedButNotPaid() {
        return `update booking
                set booking_status =${BookingStatus.FAILED}
                where order_date`
    }

    static sendOrderToCustomerOrRejectDelevery(status, bookingId) {
        return `update booking
                set booking_status = '${status}'
                where id=${bookingId}`
    }
    static returnTheAmount(bookingId) {
        return `update booking
                set payment_status ='${PaymentStatus.REFUNDED}'
                where id=${bookingId}`
    }

    static returnRatingTotalAndNumberOfRating(productId: number) {
        return `select sum(rating),count(rating)
                from reviews as r
                where r.product_id=${productId}`
    }

    static returRecentlyChatUser(receiverId: number) {
        return `With senderInfoInChat as (
                select distinct(sender_id) from chats 
                where receiver_id=${receiverId})
                select * 
                from  customer c
                inner join senderInfoInChat s
                on c.user_id =s.sender_id`
    }
}