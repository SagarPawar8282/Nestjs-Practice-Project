import { Customer } from "./customer.model";

export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY';

export const CustomerRepositoryProvider ={
    provide:CUSTOMER_REPOSITORY,
    useValue:Customer

}