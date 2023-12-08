'use strict'

const router = require('express').Router()

const { accessTokenValidator } = require('../../middlewares/auth.middleware')
const asyncHandler = require('../../utils/async-handler.util')
const reviewController = require('../../controllers/review.controller')

router.use(accessTokenValidator)

router.post('/:productId', asyncHandler(reviewController.createReview))

router.get('/:productId', asyncHandler(reviewController.getAllReviewsOfProduct))

router.put('/:id', asyncHandler(reviewController.updateReview))

router.delete('/:id', asyncHandler(reviewController.deleteReview))

module.exports = router
