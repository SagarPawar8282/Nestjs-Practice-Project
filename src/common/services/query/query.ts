export class Query {
    static getAllProductCategory(productCategory: string) {
        return `SELECT distinct(product_category)
                from product as p
                where p.product_category='${productCategory}' and p.product_category is not null;`
    }

    static checkPaymentReceivedSuccessfully(id: number) {
        return `SELECT payment_status
                from booking as b
                where b.id=${id};`
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
}