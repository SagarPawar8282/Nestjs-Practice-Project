export class Query {
    static getAllProductCategory(productCategory:string){
        return `SELECT distinct(product_category)
                from product as p
                where p.product_category='${productCategory}' and p.product_category is not null;`
    }

    static checkPaymentReceivedSuccessfully(id:number){
        return `SELECT payment_status
                from booking as b
                where b.id=${id};`
    }
}