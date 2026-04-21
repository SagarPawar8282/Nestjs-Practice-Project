import { Store } from "./store.model";

export const STORE_REPOSITORY= 'STORE_REPOSITORY';

export const StoreRepositoryProvider ={
    provide:STORE_REPOSITORY,
    useValue: Store
}