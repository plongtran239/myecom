'use strict'

const router = require('express').Router()

router.use('/api/v1/auth', require('./auth'))

router.use('/api/v1/users', require('./user'))

router.use('/api/v1/categories', require('./category'))

router.use('/api/v1/products', require('./product'))

module.exports = router
