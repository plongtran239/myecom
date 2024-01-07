const { CREATED, OK } = require('../constants/httpStatus.constant')
const { DISCOUNT_MESSAGES } = require('../constants/messages.constant')
const { SuccessResponse, CreatedResponse } = require('../models/success.response')
const DiscountService = require('../services/order/discount.service')

class DiscountController {
    async createDiscount(req, res) {
        const discount = req.body
        const data = await DiscountService.createDiscount(discount)
        res.status(CREATED.code).json(
            new CreatedResponse({
                message: DISCOUNT_MESSAGES.CREATE_DISCOUNT_SUCCESS,
                data
            })
        )
    }

    async getAllDiscounts(req, res) {
        const data = await DiscountService.getAllDiscounts()
        res.status(OK.code).json(
            new SuccessResponse({
                message: DISCOUNT_MESSAGES.GET_ALL_DISCOUNTS_SUCCESS,
                data
            })
        )
    }

    async applyDiscount(req, res) {
        const { code } = req.params
        const { order_value } = req.body

        const data = await DiscountService.applyDiscount(code, order_value)
        res.status(OK.code).json(
            new SuccessResponse({
                message: DISCOUNT_MESSAGES.APPLY_DISCOUNT_SUCCESS,
                data
            })
        )
    }

    async updateDiscount(req, res) {
        const { id } = req.params
        const data = await DiscountService.updateDiscount(id, req.body)
        res.status(OK.code).json(
            new SuccessResponse({
                message: DISCOUNT_MESSAGES.UPDATE_DISCOUNT_SUCCESS,
                data
            })
        )
    }

    async deleteDiscount(req, res) {
        const { id } = req.params
        const data = await DiscountService.deleteDiscount(id)
        res.status(OK.code).json(
            new SuccessResponse({
                message: DISCOUNT_MESSAGES.DELETE_DISCOUNT_SUCCESS,
                data
            })
        )
    }
}

module.exports = new DiscountController()
