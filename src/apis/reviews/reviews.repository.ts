import { Review } from "./reviews.model"

export const REVIEW_REPOSITORY ='REVIEW_REPOSITORY'

export const ReviewRepositoryProvider = {
    provide:REVIEW_REPOSITORY,
    useValue:Review
}