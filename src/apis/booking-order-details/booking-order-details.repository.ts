import { BookingOrderDetailsModel } from "./booking-order-details.model"

export const BOOKING_ORDER_DETAIL_REPOSITORY = 'BOOKING_ORDER_DETAIL_REPOSITORY'

export const bookingOrderDetailsRepositoryProvide = {
    provide:BOOKING_ORDER_DETAIL_REPOSITORY,
    useValue:BookingOrderDetailsModel
}