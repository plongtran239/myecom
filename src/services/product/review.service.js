const {
    USER_ERROR_MESSAGES,
    PRODUCT_ERROR_MESSAGES,
    REVIEW_ERROR_MESSAGES
} = require('../../constants/messages.constant')
const { BadRequestError } = require('../../models/error.response')
const reviewModel = require('../../models/schemas/review.schema')
const UserService = require('../user/user.service')
const ProductService = require('./product.service')

class ReviewService {
    static createReview = async ({ content, rating, images, userId, productId }) => {
        const existedUser = await UserService.findUserById(userId)
        if (!existedUser) throw new BadRequestError(USER_ERROR_MESSAGES.USER_NOT_FOUND)

        const existedProduct = await ProductService.findProductById(productId)
        if (!existedProduct) throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_NOT_FOUND)

        const newReview = new reviewModel({
            content,
            rating,
            images,
            user: existedUser,
            product: existedProduct
        })

        await ProductService.updateReviewToProduct(productId, newReview._id)

        return await newReview.save()
    }

    static getAllReviewsOfProduct = async (productId) => {
        const existedProduct = await ProductService.findProductById(productId)
        if (!existedProduct) throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_NOT_FOUND)

        const reviews = await this.findReviewByProductId(productId)

        return reviews
    }

    static updateReview = async ({ id, content, rating, images }) => {
        const existedReview = await reviewModel.findById(id)
        if (!existedReview) throw new BadRequestError(REVIEW_ERROR_MESSAGES.REVIEW_NOT_FOUND)

        existedReview.content = content
        existedReview.rating = rating
        existedReview.images = images

        return await existedReview.save()
    }

    static deleteReview = async ({ id }) => {
        const existedReview = await reviewModel.findById(id)
        if (!existedReview) throw new BadRequestError(REVIEW_ERROR_MESSAGES.REVIEW_NOT_FOUND)

        await ProductService.deleteReviewFromProduct(existedReview.product, existedReview)

        return await existedReview.deleteOne(existedReview)
    }

    static deleteAllReviewsOfProduct = async (productId) => {
        return await reviewModel.deleteMany({ product: productId })
    }

    static findReviewByProductId = async (productId) => {
        return await reviewModel.find({ product: productId }).lean()
    }

    static findReviewById = async (id) => {
        return await reviewModel.findById(id).lean()
    }
}

module.exports = ReviewService
