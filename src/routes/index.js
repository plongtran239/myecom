'use strict'

const router = require('express').Router()

router.use('/api/v1/auth', require('./auth'))

router.use('/api/v1/users', require('./user'))

module.exports = router
