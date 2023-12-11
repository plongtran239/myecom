'use strict'

const router = require('express').Router()

const discountController = require('../../controllers/discount.controller')
const { accessTokenValidator } = require('../../middlewares/auth.middleware')
const asyncHandler = require('../../utils/async-handler.util')

router.use(accessTokenValidator)

router.post('/', asyncHandler(discountController.createDiscount))

router.get('/', asyncHandler(discountController.getAllDiscounts))

router.put('/:id', asyncHandler(discountController.updateDiscount))

router.delete('/:id', asyncHandler(discountController.deleteDiscount))

module.exports = router
