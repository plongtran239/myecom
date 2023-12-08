'use strict'

// Constants
const {
    PRODUCT_ERROR_MESSAGES,
    CATEGORY_ERROR_MESSAGES,
    USER_ERROR_MESSAGES
} = require('../../constants/messages.constant')

// Models
const { BadRequestError } = require('../../models/error.response')
const productModel = require('../../models/schemas/product.schema')

// Utils
const { getInfoData } = require('../../utils/lodash.util')

// Services
const CategoryService = require('../product/category.service')
const UserService = require('../user/user.service')
const ReviewService = require('./review.service')

class ProductService {
    static createProduct = async (sellerId, productRequest) => {
        // Check if seller exists
        const seller = await UserService.findUserById(sellerId)
        if (!seller) {
            throw new BadRequestError(USER_ERROR_MESSAGES.USER_NOT_FOUND)
        }

        // Check if product exists
        const existedProduct = await this.findProductByName(productRequest.name)
        if (existedProduct) {
            throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS)
        }

        // Check if category exists
        const category = await CategoryService.findCategoryById(productRequest.category)
        if (!category) {
            throw new BadRequestError(CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND)
        }

        const product = new productModel({
            ...productRequest,
            category: getInfoData({ fields: ['_id', 'name'], object: category }),
            seller: getInfoData({ fields: ['_id', 'name', 'email'], object: seller })
        })

        return await product.save()
    }

    static getAllProducts = async () => {
        return await productModel
            .find()
            .populate({ path: 'category', select: '_id name' })
            .populate({ path: 'seller', select: '_id name email' })
            .lean()
    }

    static getDetailProduct = async (id) => {
        return await this.findProductById(id)
    }

    static updateProduct = async (id, productRequest) => {
        const existedProduct = await this.findProductById(id)
        if (!existedProduct) {
            throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_NOT_FOUND)
        }

        const category = await CategoryService.findCategoryById(productRequest.category)
        if (!category) {
            throw new BadRequestError(CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND)
        }

        return await productModel
            .findByIdAndUpdate(id, productRequest, {
                new: true
            })
            .lean()
    }

    static deleteProduct = async (id) => {
        const existedProduct = await this.findProductById(id)
        if (!existedProduct) {
            throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_NOT_FOUND)
        }

        await ReviewService.deleteAllReviewsOfProduct(id)

        return await productModel.findByIdAndDelete(id).lean()
    }

    static updateReviewToProduct = async (productId, reviewId) => {
        const existedProduct = await productModel.findById(productId)
        if (!existedProduct) {
            throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_NOT_FOUND)
        }

        console.log('reviewId', reviewId)

        existedProduct.reviews.push(reviewId)

        return await existedProduct.save()
    }

    static deleteReviewFromProduct = async (productId, reviewId) => {
        const existedProduct = await productModel.findById(productId)
        if (!existedProduct) {
            throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_NOT_FOUND)
        }

        existedProduct.reviews = existedProduct.reviews.filter((review) => review._id !== reviewId)

        return await existedProduct.save()
    }

    static findProductById = async (id) => {
        return await productModel.findById(id).lean()
    }

    static findProductByName = async (name) => {
        return await productModel.findOne({ name }).lean()
    }
}

module.exports = ProductService
