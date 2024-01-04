const router = require('express').Router()

const authController = require('../../controllers/auth.controller')
const { accessTokenValidator, passwordValidator } = require('../../middlewares/auth.middleware')
const asyncHandler = require('../../utils/async-handler.util')

// Sign up
router.post('/register', passwordValidator, asyncHandler(authController.register))

// Sign in
router.post('/login', asyncHandler(authController.login))

// Refresh token
router.post('/refresh-token', asyncHandler(authController.refreshToken))

router.use(accessTokenValidator)

// Sign out
router.post('/logout', asyncHandler(authController.logout))

module.exports = router
