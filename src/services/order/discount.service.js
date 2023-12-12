const { DISCOUNT_TYPE } = require('../../constants/enum.constant')
const { DISCOUNT_ERROR_MESSAGES } = require('../../constants/messages.constant')

const { BadRequestError } = require('../../models/error.response')
const discountModel = require('../../models/schemas/discount.schema')

const moment = require('moment-timezone')

class DiscountService {
    static async createDiscount(discount) {
        const existedDiscount = await this.findDiscountByCode(discount.code)
        if (existedDiscount) {
            throw new BadRequestError(DISCOUNT_ERROR_MESSAGES.DISCOUNT_ALREADY_EXISTS)
        }

        const startDate = moment(discount.start_date).tz('Asia/Ho_Chi_Minh').toDate()
        const endDate = moment(discount.end_date).tz('Asia/Ho_Chi_Minh').toDate()

        return await discountModel.create({
            ...discount,
            start_date: startDate,
            end_date: endDate
        })
    }

    static async getAllDiscounts() {
        return await discountModel.find().lean()
    }

    static async updateDiscount(id, data) {
        const discount = await discountModel.findById(id)
        if (!discount) {
            throw new BadRequestError(DISCOUNT_ERROR_MESSAGES.DISCOUNT_NOT_FOUND)
        }

        Object.assign(discount, data)
        return await discount.save()
    }

    static async deleteDiscount(id) {
        const discount = await discountModel.findById(id)
        if (!discount) {
            throw new BadRequestError(DISCOUNT_ERROR_MESSAGES.DISCOUNT_NOT_FOUND)
        }

        return await discountModel.findByIdAndDelete(id)
    }

    static async findDiscountByCode(code) {
        return await discountModel.findOne({ code }).lean()
    }

    static applyDiscount(discount, subTotal) {
        let discountValue = 0
        if (discount.type === DISCOUNT_TYPE.PERCENTAGE) {
            discountValue = subTotal * (discount.value / 100)
        } else {
            discountValue = discount.value
        }
        return discountValue
    }
}

module.exports = DiscountService
