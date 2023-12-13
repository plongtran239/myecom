'use strict'

const router = require('express').Router()

const orderController = require('../../controllers/order.controller')
const { accessTokenValidator } = require('../../middlewares/auth.middleware')
const discountValidator = require('../../middlewares/discount.middleware')
const asyncHandler = require('../../utils/async-handler.util')

router.use(accessTokenValidator)

router.get('/', asyncHandler(orderController.getAllOrders))

router.get('/:id', asyncHandler(orderController.getOrderById))

router.post('/', discountValidator, asyncHandler(orderController.createOrder))

router.put('/:id', asyncHandler(orderController.updateOrder))

router.delete('/:id', asyncHandler(orderController.deleteOrder))

module.exports = router
