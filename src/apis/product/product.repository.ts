import { Product } from "./product.model";

export const PRODUCT_REPOSITORY='PRODUCT_REPOSITORY';

export const productRepositoryProvider = {
    provide:PRODUCT_REPOSITORY,
    useValue:Product
}