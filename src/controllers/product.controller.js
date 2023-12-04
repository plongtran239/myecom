// Constants
const { CREATED, OK } = require('../constants/httpStatus.constant')
const { PRODUCT_MESSAGES } = require('../constants/messages.constant')

// Models
const { CreatedResponse, SuccessResponse } = require('../models/success.response')

// Services
const ProductService = require('../services/product/product.service')

class ProductController {
    createProduct = async (req, res) => {
        const { userId } = req.decodedUser
        const data = await ProductService.createProduct(userId, req.body)
        return res.status(CREATED.code).json(
            new CreatedResponse({
                message: PRODUCT_MESSAGES.CREATE_PRODUCT_SUCCESS,
                data
            })
        )
    }

    getAllProducts = async (req, res) => {
        const data = await ProductService.getAllProducts()
        return res.status(OK.code).json(
            new SuccessResponse({
                message: PRODUCT_MESSAGES.GET_ALL_PRODUCTS_SUCCESS,
                data
            })
        )
    }

    getDetailProduct = async (req, res) => {
        const { id } = req.params
        const data = await ProductService.getDetailProduct(id)
        return res.status(OK.code).json(
            new SuccessResponse({
                message: PRODUCT_MESSAGES.GET_DETAIL_PRODUCT_SUCCESS,
                data
            })
        )
    }

    updateProduct = async (req, res) => {
        const { id } = req.params
        const data = await ProductService.updateProduct(id, req.body)
        return res.status(OK.code).json(
            new SuccessResponse({
                message: PRODUCT_MESSAGES.UPDATE_PRODUCT_SUCCESS,
                data
            })
        )
    }

    deleteProduct = async (req, res) => {
        const { id } = req.params
        const data = await ProductService.deleteProduct(id)
        return res.status(OK.code).json(
            new SuccessResponse({
                message: PRODUCT_MESSAGES.DELETE_PRODUCT_SUCCESS,
                data
            })
        )
    }
}

module.exports = new ProductController()
