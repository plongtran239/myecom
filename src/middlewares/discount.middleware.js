const { DISCOUNT_ERROR_MESSAGES } = require('../constants/messages.constant')

const { BadRequestError } = require('../models/error.response')

const DiscountService = require('../services/order/discount.service')

const asyncHandler = require('../utils/async-handler.util')

const discountValidator = asyncHandler(async (req, res, next) => {
    const { discount } = req.body
    if (discount) {
        const existedDiscount = await DiscountService.findDiscountByCode(discount)
        if (!existedDiscount) {
            throw new BadRequestError(DISCOUNT_ERROR_MESSAGES.DISCOUNT_NOT_FOUND)
        }

        if (!existedDiscount.is_active) {
            throw new BadRequestError(DISCOUNT_ERROR_MESSAGES.DISCOUNT_INACTIVE)
        }

        if (existedDiscount.uses_count === existedDiscount.max_uses) {
            throw new BadRequestError(DISCOUNT_ERROR_MESSAGES.DISCOUNT_MAX_USES)
        }
    }
    next()
})

module.exports = discountValidator
