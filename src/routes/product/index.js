'use strict'

const router = require('express').Router()

const { accessTokenValidator } = require('../../middlewares/auth.middleware')
const asyncHandler = require('../../utils/async-handler.util')

router.use(accessTokenValidator)

router.get('/', asyncHandler())

router.put('/:id', asyncHandler())

router.delete('/:id', asyncHandler())

module.exports = router
