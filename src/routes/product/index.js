'use strict'

const router = require('express').Router()

const productController = require('../../controllers/product.controller')
const { accessTokenValidator } = require('../../middlewares/auth.middleware')
const asyncHandler = require('../../utils/async-handler.util')

router.get('/', asyncHandler(productController.getAllProducts))

router.use(accessTokenValidator)

router.get('/shop', asyncHandler(productController.getShopProducts))

router.post('/', asyncHandler(productController.createProduct))

router.get('/:id', asyncHandler(productController.getDetailProduct))

router.put('/:id', asyncHandler(productController.updateProduct))

router.delete('/:id', asyncHandler(productController.deleteProduct))

module.exports = router
