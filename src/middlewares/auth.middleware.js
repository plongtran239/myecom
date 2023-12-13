'use strict'

const { REQUEST_ERROR_MESSAGES, AUTH_ERROR_MESSAGES } = require('../constants/messages.constant')

const asyncHandler = require('../utils/async-handler.util')
const { verifyToken } = require('../utils/auth.util')

const envConfig = require('../configs/env.config')
const { BadRequestError } = require('../models/error.response')

const HEADER = {
    AUTHORIZATION: 'authorization'
}

const accessTokenValidator = asyncHandler(async (req, res, next) => {
    // Get token from header
    const token = req.headers[HEADER.AUTHORIZATION]?.toString()
    if (!token) {
        throw new UnauthorizedError(REQUEST_ERROR_MESSAGES.INVALID_AUTHENTICATION)
    }
    const accessToken = token.substring(7, token.length) // Bearer [token]

    // Verify token
    const decodedUser = verifyToken(accessToken, envConfig.jwt_access_token_secret)
    req.decodedUser = decodedUser
    next()
})

const passwordValidator = asyncHandler(async (req, res, next) => {
    const { password, confirmPassword } = req.body
    if (password.length < 8) {
        throw new BadRequestError(AUTH_ERROR_MESSAGES.PASSWORD_MIN_LENGTH)
    }
    if (password !== confirmPassword) {
        throw new BadRequestError(AUTH_ERROR_MESSAGES.PASSWORD_NOT_MATCH)
    }
    next()
})

module.exports = {
    accessTokenValidator,
    passwordValidator
}
