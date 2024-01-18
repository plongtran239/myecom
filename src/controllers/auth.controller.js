'use strict'

// Models
const { CreatedResponse, SuccessResponse } = require('../models/success.response')

// Constants
const { OK, CREATED } = require('../constants/httpStatus.constant')
const { AUTH_MESSAGES } = require('../constants/messages.constant')

// Services
const AuthService = require('../services/auth/auth.service')

class AuthController {
    refreshToken = async (req, res) => {
        const data = await AuthService.refreshToken(req.body.token)
        return res.status(OK.code).json(
            new SuccessResponse({
                message: AUTH_MESSAGES.REFRESH_TOKEN_SUCCESS,
                data
            })
        )
    }

    logout = async (req, res) => {
        const data = await AuthService.logout(req.decodedUser.userId)
        return res.status(OK.code).json(
            new SuccessResponse({
                message: AUTH_MESSAGES.LOGOUT_SUCCESS,
                data
            })
        )
    }

    login = async (req, res) => {
        const data = await AuthService.login(req.body)
        return res.status(OK.code).json(
            new SuccessResponse({
                message: AUTH_MESSAGES.LOGIN_SUCCESS,
                data
            })
        )
    }

    register = async (req, res) => {
        const data = await AuthService.register(req.body)
        return res.status(CREATED.code).json(
            new CreatedResponse({
                message: AUTH_MESSAGES.SIGNUP_SUCCESS,
                data
            })
        )
    }

    changePassword = async (req, res) => {
        const { userId } = req.decodedUser
        const data = await AuthService.changePassword(userId, req.body)
        return res.status(OK.code).json(
            new SuccessResponse({
                message: AUTH_MESSAGES.RESET_PASSWORD_SUCCESS,
                data
            })
        )
    }
}

module.exports = new AuthController()
