'use strict'

const router = require('express').Router()

const categoryController = require('../../controllers/category.controller')
const { accessTokenValidator } = require('../../middlewares/auth.middleware')
const asyncHandler = require('../../utils/async-handler.util')

router.use(accessTokenValidator)

router.post('/', asyncHandler(categoryController.createCategory))

router.get('/', asyncHandler(categoryController.getAllCategories))

router.put('/:id', asyncHandler(categoryController.updateCategory))

router.delete('/:id', asyncHandler(categoryController.deleteCategory))

module.exports = router
