//
const {
    DISCOUNT_ERROR_MESSAGES,
    USER_ERROR_MESSAGES,
    PRODUCT_ERROR_MESSAGES,
    ORDER_ERROR_MESSAGES
} = require('../../constants/messages.constant')
const { ORDER_STATUS } = require('../../constants/enum.constant')

// Models
const { BadRequestError } = require('../../models/error.response')
const orderModel = require('../../models/schemas/order.schema')

// Services
const UserService = require('../user/user.service')
const DiscountService = require('./discount.service')
const ProductService = require('../product/product.service')

class OrderService {
    static async createOrder(userId, order) {
        let newOrder = {
            user: null,
            discount: null,
            order_lines: [],
            status: ORDER_STATUS.BEING_PREPARED,
            total: 0
        }

        // Check user
        const user = await UserService.findUserById(userId)
        if (!user) {
            throw new BadRequestError(USER_ERROR_MESSAGES.USER_NOT_FOUND)
        }

        // Check order lines
        for (const orderLine of order.order_lines) {
            let sub_total = 0
            const product = await ProductService.findProductById(orderLine.product)
            if (!product) {
                throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_NOT_FOUND)
            } else {
                this.checkVariant(product, orderLine.variant)
                // Calculate sub total for each order line
                sub_total = product.price * orderLine.quantity
                // Add order line to order
                newOrder = {
                    ...newOrder,
                    order_lines: [
                        ...newOrder.order_lines,
                        {
                            product: product._id,
                            variant: orderLine.variant,
                            quantity: orderLine.quantity,
                            sub_total
                        }
                    ]
                }
            }
        }

        // Check discount
        const sub_total = newOrder.order_lines.reduce((total, orderLine) => total + orderLine.sub_total, 0)

        // Apply discount
        if (order.discount) {
            const existedDiscount = await DiscountService.findDiscountByCode(order.discount)
            if (!existedDiscount) {
                throw new BadRequestError(DISCOUNT_ERROR_MESSAGES.DISCOUNT_NOT_FOUND)
            } else {
                const discountValue = DiscountService.applyDiscount(existedDiscount, sub_total)
                newOrder = {
                    ...newOrder,
                    discount_value: discountValue,
                    discount: existedDiscount._id
                }
            }
        }

        newOrder = {
            ...newOrder,
            user,
            sub_total,
            total: sub_total - newOrder.discount_value
        }

        return await orderModel.create(newOrder)
    }

    static async getAllOrders() {
        return await orderModel.find().lean()
    }

    static async getOrderById(id) {
        return await orderModel.findById(id).lean()
    }

    static async updateOrder(id, data) {
        const existedOrder = await orderModel.findById(id).lean()
        if (!existedOrder) {
            throw new BadRequestError(ORDER_ERROR_MESSAGES.ORDER_NOT_FOUND)
        }
        const newOrder = {
            ...existedOrder,
            status: data.status
        }
        return await orderModel.findByIdAndUpdate(id, newOrder, { new: true })
    }

    static async deleteOrder(id) {
        const order = await orderModel.findById(id)
        if (!order) {
            throw new BadRequestError(ORDER_ERROR_MESSAGES.ORDER_NOT_FOUND)
        }
        return await orderModel.findByIdAndDelete(id)
    }

    static checkVariant = (product, orderVariant) => {
        if (orderVariant) {
            const existedVariant = product.variants.find((variant) => variant === orderVariant)
            if (!existedVariant) {
                throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_VARIANT_NOT_FOUND)
            }
        } else if (product.variants.length > 0) {
            throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_VARIANT_REQUIRED)
        }
    }
}

module.exports = OrderService
