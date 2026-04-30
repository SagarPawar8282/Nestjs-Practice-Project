import { ProductPeristenceModel } from "./product-persistence.model"

export const PRODUCT_PERSISTENCE_REPOSITORY='PRODUCT_PERSISTENCE_REPOSITORY'

export const productPersistenceRepositoryProvider={
    provide:PRODUCT_PERSISTENCE_REPOSITORY,
    useValue:ProductPeristenceModel
}