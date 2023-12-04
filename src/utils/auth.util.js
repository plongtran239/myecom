'use strict'

const JWT = require('jsonwebtoken')
const { jwt_access_token_secret, jwt_refresh_token_secret } = require('../configs/env.config')

const createTokenPair = (payload) => {
    const accessToken = createAccessToken(payload)
    const refreshToken = createRefreshToken(payload)
    return { accessToken, refreshToken }
}

const createAccessToken = (payload) => {
    return JWT.sign(payload, jwt_access_token_secret, {
        expiresIn: '15m'
    })
}

const createRefreshToken = (payload) => {
    return JWT.sign(payload, jwt_refresh_token_secret, {
        expiresIn: '7d'
    })
}

const verifyToken = (token, tokenSecret) => {
    return JWT.verify(token, tokenSecret)
}

module.exports = { createTokenPair, createAccessToken, createRefreshToken, verifyToken }
