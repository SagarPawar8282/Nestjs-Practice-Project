import { ProductDimension } from "./product-dimensions.model"

export const PRODUCT_DIMENSIONS_REPOSITORY = 'PRODUCT_DIMENSIONS_REPOSITORY'

export const ProductDeminsionRepositoryProvider = {
    provide: PRODUCT_DIMENSIONS_REPOSITORY,
    useValue : ProductDimension
}
