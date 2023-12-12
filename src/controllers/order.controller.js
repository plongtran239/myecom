const { CREATED, OK } = require('../constants/httpStatus.constant')
const { ORDER_MESSAGES } = require('../constants/messages.constant')

const { CreatedResponse, SuccessResponse } = require('../models/success.response')

const OrderService = require('../services/order/order.service')

class OrderController {
    createOrder = async (req, res) => {
        const { userId } = req.decodedUser

        const data = await OrderService.createOrder(userId, req.body)

        return res.status(CREATED.code).json(
            new CreatedResponse({
                message: ORDER_MESSAGES.CREATE_ORDER_SUCCESS,
                data
            })
        )
    }

    getAllOrders = async (req, res) => {
        const data = await OrderService.getAllOrders()

        return res.status(OK.code).json(
            new SuccessResponse({
                message: ORDER_MESSAGES.GET_ALL_ORDERS_SUCCESS,
                data
            })
        )
    }

    getOrderById = async (req, res) => {
        const { orderId } = req.params

        const data = await OrderService.getOrderById(orderId)

        return res.status(OK.code).json(
            new SuccessResponse({
                message: ORDER_MESSAGES.GET_ORDER_SUCCESS,
                data
            })
        )
    }

    // Update order status
    updateOrder = async (req, res) => {
        const { id } = req.params

        const data = await OrderService.updateOrder(id, req.body)

        return res.status(OK.code).json(
            new SuccessResponse({
                message: ORDER_MESSAGES.UPDATE_ORDER_SUCCESS,
                data
            })
        )
    }

    deleteOrder = async (req, res) => {
        const { id } = req.params

        const data = await OrderService.deleteOrder(id)

        return res.status(OK.code).json(
            new SuccessResponse({
                message: ORDER_MESSAGES.DELETE_ORDER_SUCCESS,
                data
            })
        )
    }
}

module.exports = new OrderController()
