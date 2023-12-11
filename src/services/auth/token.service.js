'use strict'

const { Types } = require('mongoose')

const tokenModel = require('../../models/schemas/token.schema')

class TokenService {
    static createToken = async ({ userId, refreshToken }) => {
        const filter = { user: userId }
        const update = { refresh_token: refreshToken }
        const options = { upsert: true, new: true }

        await tokenModel.findOneAndUpdate(filter, update, options)
    }

    static findByUserId = async (userId) => {
        return await tokenModel.findOne({ user: new Types.ObjectId(userId) }).lean()
    }

    static findByRefreshToken = async (refreshToken) => {
        return await tokenModel.findOne({ refresh_token: refreshToken }).lean()
    }

    static deleteTokenByUserId = async (userId) => {
        return await tokenModel.deleteOne({ user: new Types.ObjectId(userId) })
    }
}

module.exports = TokenService
