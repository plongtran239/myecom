'use strict'

const router = require('express').Router()

const API_ROUTE = '/api/'

router.use(API_ROUTE + 'auth', require('./auth'))

router.use(API_ROUTE + 'users', require('./user'))

router.use(API_ROUTE + 'products', require('./product'))

router.use(API_ROUTE + 'categories', require('./category'))

router.use(API_ROUTE + 'reviews', require('./review'))

router.use(API_ROUTE + 'discounts', require('./discount'))

router.use(API_ROUTE + 'orders', require('./order'))

module.exports = router
