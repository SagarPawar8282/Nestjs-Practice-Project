import { Booking } from "./bookings.model"

export const BOOKING_REPOSITORY= 'BOOKING_REPOSITORY'

export const bookingRepositoryProvider={
    provide:BOOKING_REPOSITORY,
    useValue:Booking
}