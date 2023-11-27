'use strict'

const router = require('express').Router()

const usersController = require('../../controllers/users.controller')
const { accessTokenValidator } = require('../../middlewares/auth.middleware')
const asyncHandler = require('../../utils/async-handler.util')

router.use(accessTokenValidator)

// Get all users
router.get('/', asyncHandler(usersController.getAllUsers))

// Get profile
router.get('/profile', asyncHandler(usersController.getProfile))

// Get detail user
router.get('/:id', asyncHandler(usersController.getDetailUser))

// Update user
router.put('/:id', asyncHandler(usersController.updateUser))

// Delete user
router.delete('/:id', asyncHandler(usersController.deleteUser))

module.exports = router
