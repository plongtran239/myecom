'use strict'

const router = require('express').Router()

const productController = require('../../controllers/product.controller')
const { accessTokenValidator } = require('../../middlewares/auth.middleware')
const asyncHandler = require('../../utils/async-handler.util')

router.use(accessTokenValidator)

router.post('/', asyncHandler(productController.createProduct))

router.get('/', asyncHandler(productController.getAllProducts))

router.get('/:id', asyncHandler(productController.getDetailProduct))

router.put('/:id', asyncHandler(productController.updateProduct))

router.delete('/:id', asyncHandler(productController.deleteProduct))

module.exports = router
