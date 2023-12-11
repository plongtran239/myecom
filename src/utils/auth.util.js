'use strict'

const JWT = require('jsonwebtoken')
const {
    jwt_access_token_secret,
    jwt_access_token_expired_in,
    jwt_refresh_token_secret,
    jwt_refresh_token_expired_in
} = require('../configs/env.config')

const createTokenPair = (payload) => {
    const accessToken = createAccessToken(payload)
    const refreshToken = createRefreshToken(payload)
    return { accessToken, refreshToken }
}

const createAccessToken = (payload) => {
    return JWT.sign(payload, jwt_access_token_secret, {
        expiresIn: jwt_access_token_expired_in
    })
}

const createRefreshToken = (payload) => {
    return JWT.sign(payload, jwt_refresh_token_secret, {
        expiresIn: jwt_refresh_token_expired_in
    })
}

const verifyToken = (token, tokenSecret) => {
    return JWT.verify(token, tokenSecret)
}

module.exports = { createTokenPair, createAccessToken, createRefreshToken, verifyToken }
