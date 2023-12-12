'use strict'

const bcrypt = require('bcrypt')

// Services
const TokenService = require('./token.service')
const UserService = require('../user/user.service')

// Constants
const { USER_ERROR_MESSAGES, AUTH_ERROR_MESSAGES } = require('../../constants/messages.constant')
const envConfig = require('../../configs/env.config')

// Models
const userModel = require('../../models/schemas/user.schema')
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../models/error.response')

// Utils
const { createTokenPair, verifyToken } = require('../../utils/auth.util')
const { getInfoData } = require('../../utils/lodash.util')

class AuthService {
    static refreshToken = async (refreshToken) => {
        const token = await TokenService.findByRefreshToken(refreshToken)
        if (!token) {
            throw new NotFoundError(AUTH_ERROR_MESSAGES.REFRESH_TOKEN_NOT_FOUND)
        }
        const decodedUser = verifyToken(refreshToken, envConfig.jwt_refresh_token_secret)
        if (!decodedUser) {
            throw new UnauthorizedError(AUTH_ERROR_MESSAGES.INVALID_REFRESH_TOKEN)
        }
        const { userId, email } = decodedUser
        const user = await UserService.findUserByEmail(email)
        if (!user) {
            throw new NotFoundError(USER_ERROR_MESSAGES.USER_NOT_FOUND)
        }
        const tokens = await this.generateTokens({ userId, email })
        return {
            user: getInfoData({
                fields: ['_id', 'name', 'email'],
                object: user
            }),
            tokens
        }
    }

    static logout = async (userId) => {
        return await TokenService.deleteTokenByUserId(userId)
    }

    static login = async ({ email, password }) => {
        const user = await UserService.findUserByEmail(email)
        if (!user) {
            throw new NotFoundError(USER_ERROR_MESSAGES.EMAIL_NOT_FOUND)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedError(USER_ERROR_MESSAGES.PASSWORD_INCORRECT)
        }

        const tokens = await this.generateTokens({
            userId: user._id,
            email
        })

        return {
            user: getInfoData({
                fields: ['_id', 'name', 'email'],
                object: user
            }),
            tokens
        }
    }

    static register = async ({ name, email, password, role }) => {
        // Check email exists
        const existedUser = await UserService.findUserByEmail(email)
        if (existedUser) {
            throw new BadRequestError(USER_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS)
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        const tokens = await this.generateTokens({ userId: newUser._id, email })

        return {
            user: getInfoData({
                fields: ['_id', 'name', 'email'],
                object: newUser
            }),
            tokens
        }
    }

    static generateTokens = async ({ userId, email }) => {
        // Create token pair
        const tokens = createTokenPair({
            userId,
            email
        })

        // Create token
        await TokenService.createToken({
            userId,
            refreshToken: tokens.refreshToken
        })

        return tokens
    }
}

module.exports = AuthService
