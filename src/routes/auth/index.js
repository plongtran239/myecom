const router = require('express').Router()

const authController = require('../../controllers/auth.controller')
const { accessTokenValidator } = require('../../middlewares/auth.middleware')
const asyncHandler = require('../../utils/async-handler.util')

// Sign up
router.post('/register', asyncHandler(authController.register))

// Sign in
router.post('/login', asyncHandler(authController.login))

router.use(accessTokenValidator)
// Sign out
router.post('/logout', asyncHandler(authController.logout))

// Refresh token
router.post('/refresh-token', asyncHandler(authController.refreshToken))

module.exports = router
