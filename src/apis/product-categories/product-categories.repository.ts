import { ProductCategory } from "./product-categories.model"

export const PRODUCT_CATEGORY_REPOSITORY='PRODUCT_CATEGORY_REPOSITORY'

export const ProductCategoryRepositoryProvider = {
    provide:PRODUCT_CATEGORY_REPOSITORY,
    useValue:ProductCategory
}