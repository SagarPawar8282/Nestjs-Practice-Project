import { BookingAddressDetails } from "./booking-address-details.model";

export const BOOKING_ADDRESS_DETAILS_REPOSITORY = 'BOOKING_ADDRESS_DETAILS_REPOSITORY';

export const bookingAddressDetailsRepositoryProvider = {
    provide:BOOKING_ADDRESS_DETAILS_REPOSITORY,
    useValue:BookingAddressDetails
}