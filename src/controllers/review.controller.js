// Constants
const { CREATED, OK } = require('../constants/httpStatus.constant')
const { REVIEW_MESSAGES } = require('../constants/messages.constant')

// Models
const { CreatedResponse, SuccessResponse } = require('../models/success.response')
const ReviewService = require('../services/product/review.service')

class ReviewController {
    createReview = async (req, res) => {
        const { content, rating, images } = req.body
        const { productId } = req.params
        const { userId } = req.decodedUser

        const data = await ReviewService.createReview({
            content,
            rating,
            images,
            userId,
            productId
        })

        return res.status(CREATED.code).json(
            new CreatedResponse({
                message: REVIEW_MESSAGES.CREATE_REVIEW_SUCCESS,
                data
            })
        )
    }

    getAllReviewsOfProduct = async (req, res) => {
        const { productId } = req.params

        const data = await ReviewService.getAllReviewsOfProduct(productId)

        return res.status(OK.code).json(
            new SuccessResponse({
                message: REVIEW_MESSAGES.GET_ALL_REVIEWS_OF_PRODUCT_SUCCESS,
                data
            })
        )
    }

    updateReview = async (req, res) => {
        const { content, rating, images } = req.body
        const { id } = req.params

        const data = await ReviewService.updateReview({ id, content, rating, images })

        return res.status(OK.code).json(
            new SuccessResponse({
                message: REVIEW_MESSAGES.UPDATE_REVIEW_SUCCESS,
                data
            })
        )
    }

    deleteReview = async (req, res) => {
        const { id } = req.params

        const data = await ReviewService.deleteReview({ id })

        return res.status(OK.code).json(
            new SuccessResponse({
                message: REVIEW_MESSAGES.DELETE_REVIEW_SUCCESS,
                data
            })
        )
    }
}

module.exports = new ReviewController()
