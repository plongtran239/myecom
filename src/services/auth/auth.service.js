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
const { ROLE } = require('../../constants/enum.constant')

const responseFields = ['_id', 'name', 'email', 'role', 'avatar']

class AuthService {
    static changePassword = async (userId, { oldPassword, newPassword, confirmPassword }) => {
        console.log({ userId, oldPassword, newPassword, confirmPassword })

        if (newPassword !== confirmPassword) {
            throw new BadRequestError(AUTH_ERROR_MESSAGES.PASSWORD_NOT_MATCH)
        }
        if (newPassword.length < 8) {
            throw new BadRequestError(AUTH_ERROR_MESSAGES.PASSWORD_MIN_LENGTH)
        }

        const user = await UserService.findUserById(userId)

        if (!user) {
            throw new NotFoundError(USER_ERROR_MESSAGES.USER_NOT_FOUND)
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            throw new UnauthorizedError(AUTH_ERROR_MESSAGES.OLD_PASSWORD_INCORRECT)
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await userModel.findByIdAndUpdate(userId, {
            password: hashedPassword
        })
    }

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
                fields: responseFields,
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
                fields: responseFields,
                object: user
            }),
            tokens
        }
    }

    static register = async ({ name, email, password, confirmPassword, role }) => {
        // Check email exists
        const existedUser = await UserService.findUserByEmail(email)
        if (existedUser) {
            throw new BadRequestError(USER_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS)
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            name: name || email,
            email,
            password: hashedPassword,
            role: role || ROLE.USER
        })

        const tokens = await this.generateTokens({ userId: newUser._id, email })

        return {
            user: getInfoData({
                fields: responseFields,
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
