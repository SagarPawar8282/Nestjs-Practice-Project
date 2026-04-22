/**
 * NOTE:
 * Store model and repository have been moved to PersistenceModule.
 *
 * Reason:
 * - To avoid circular dependency between StoreModule and QueueModule
 * - To centralize all database access logic
 *
 * Please refer to: /modules/persistence
 */


// import { Product } from "./product.model";

// export const PRODUCT_REPOSITORY='PRODUCT_REPOSITORY';

// export const productRepositoryProvider = {
//     provide:PRODUCT_REPOSITORY,
//     useValue:Product
// }