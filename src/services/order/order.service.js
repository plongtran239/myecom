const {
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
            discount_value: 0,
            total: 0,
            delivery_address: order.delivery_address
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
                // Calculate sub total for each order line
                sub_total = product.price * orderLine.quantity
                // Add order line to order
                newOrder = {
                    ...newOrder,
                    order_lines: [
                        ...newOrder.order_lines,
                        {
                            product: product._id,
                            quantity: orderLine.quantity,
                            status: ORDER_STATUS.BEING_PREPARED.value,
                            sub_total
                        }
                    ]
                }

                await ProductService.updateProduct(product._id, {
                    ...product,
                    quantity: product.quantity - orderLine.quantity,
                    sold_quantity: product.sold_quantity + orderLine.quantity
                })
            }
        }

        // Calculate sub total for order
        const sub_total = newOrder.order_lines.reduce((total, orderLine) => total + orderLine.sub_total, 0)

        // Apply discount
        if (order.discount) {
            const existedDiscount = await DiscountService.findDiscountByCode(order.discount)
            const discountValue = DiscountService.calculateDiscount(existedDiscount, sub_total)
            newOrder = {
                ...newOrder,
                discount_value: discountValue,
                discount: existedDiscount._id
            }

            // Update uses count
            await DiscountService.updateDiscount(existedDiscount._id, {
                ...existedDiscount,
                uses_count: existedDiscount.uses_count + 1
            })
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

    static async getShopOrders(shopId, status) {
        const products = await ProductService.getShopProducts(shopId)

        const productIds = products.map((product) => product._id)

        const orders = await orderModel
            .find()
            .populate({
                path: 'user',
                select: '_id phone name'
            })
            .populate({
                path: 'order_lines.product',
                select: '_id name price images seller category',
                populate: {
                    path: 'category',
                    select: '_id name'
                }
            })
            .where({ 'order_lines.product': { $in: productIds } })
            .lean()

        const shopOrders = orders.map((order) => {
            let orderLines = order.order_lines.filter((order_line) => {
                for (const product of products) {
                    if (product._id.equals(order_line.product._id)) {
                        return true
                    }
                }
                return false
            })
            if (status) {
                orderLines = orderLines.filter((orderLine) => orderLine.status.toString() === status)
            }

            return {
                ...order,
                order_lines: orderLines
            }
        })

        return shopOrders
    }

    static async getOrdersByUserId(userId, status) {
        const orders = await orderModel
            .find({ user: userId })
            .populate({
                path: 'order_lines.product',
                select: '_id name price images seller',
                populate: {
                    path: 'seller',
                    select: '_id name avatar'
                }
            })
            .lean()

        const userOrders = orders.map((order) => {
            let orderLines = order.order_lines
            if (status) {
                orderLines = orderLines.filter((orderLine) => orderLine.status.toString() === status)
            }

            return {
                ...order,
                order_lines: orderLines
            }
        })

        return userOrders
    }

    static async getOrderById(id) {
        return await orderModel.findById(id).lean()
    }

    static async updateOrder(data) {
        // const existedOrderLine = await orderModel.findOne({ 'order_lines._id': orderLineId })

        // if (!existedOrderLine) {
        //     throw new BadRequestError(ORDER_ERROR_MESSAGES.ORDER_NOT_FOUND)
        // }

        const { orderLineIds, status } = data

        const existedOrder = await orderModel.findOne({ 'order_lines._id': orderLineIds[0] })

        if (!existedOrder) {
            throw new BadRequestError(ORDER_ERROR_MESSAGES.ORDER_NOT_FOUND)
        }

        const newOrder = {
            ...existedOrder,
            order_lines: existedOrder.order_lines.map((orderLine) => {
                if (orderLineIds.includes(orderLine._id.toString())) {
                    orderLine.status = status
                    return orderLine
                }
                return orderLine
            })
        }

        return await orderModel.findByIdAndUpdate(existedOrder._id, newOrder, { new: true })

        // const existedOrder = await orderModel.findById(id).lean()
        // if (!existedOrder) {
        //     throw new BadRequestError(ORDER_ERROR_MESSAGES.ORDER_NOT_FOUND)
        // }
        // const newOrder = {
        //     ...existedOrder,
        //     order_lines: existedOrder.order_lines.map((orderLine) => {
        //         if (orderLine._id.equals(orderLineId)) {
        //             return {
        //                 ...orderLine,
        //                 status
        //             }
        //         }
        //         return orderLine
        //     })
        // }
        // return await orderModel.findByIdAndUpdate(id, newOrder, { new: true })
    }

    static async deleteOrder(id) {
        const order = await orderModel.findById(id)
        if (!order) {
            throw new BadRequestError(ORDER_ERROR_MESSAGES.ORDER_NOT_FOUND)
        }
        return await orderModel.findByIdAndDelete(id)
    }

    // static checkVariant = (product, orderVariants) => {
    //     if (orderVariants.length > 0) {
    //         const productVariants = Object.values(product.variants)

    //         // Check if order variants length is equal to product variants length
    //         if (orderVariants.length !== productVariants.length) {
    //             throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_VARIANT_REQUIRED)
    //         }

    //         // Check if order variants are in product variants
    //         const isOrderVariantsInProductVariants = orderVariants.every((orderVariant, index) => {
    //             return productVariants[index].includes(orderVariant)
    //         })

    //         if (!isOrderVariantsInProductVariants) {
    //             throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_VARIANT_NOT_FOUND)
    //         }
    //     } else if (Object.keys(product.variants).length > 0) {
    //         throw new BadRequestError(PRODUCT_ERROR_MESSAGES.PRODUCT_VARIANT_REQUIRED)
    //     }
    // }
}

module.exports = OrderService
