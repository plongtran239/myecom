'use strict'

const { Types } = require('mongoose')

const tokenModel = require('../../models/schemas/token.schema')

class TokenService {
  static createToken = async ({ userId, refreshToken }) => {
    const filter = { user: userId }
    const update = { refreshToken }
    const options = { upsert: true, new: true }

    await tokenModel.findOneAndUpdate(filter, update, options)
  }

  static findByUserId = async (userId) => {
    return await tokenModel.findOne({ user: new Types.ObjectId(userId) }).lean()
  }

  static findByRefreshToken = async (refreshToken) => {
    return await tokenModel.findOne({ refreshToken }).lean()
  }

  static deleteTokenByUserId = async (userId) => {
    return await tokenModel.deleteOne({ user: new Types.ObjectId(userId) })
  }
}

module.exports = TokenService
