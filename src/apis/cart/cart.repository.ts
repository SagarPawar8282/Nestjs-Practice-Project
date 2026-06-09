import { CartModel } from "./cart.model"

export const CART_REPOSITORY = 'CART_REPOSITORY'

export const cartRepositoryProvider = {
    provide:CART_REPOSITORY,
    useValue:CartModel
} 