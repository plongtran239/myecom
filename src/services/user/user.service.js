'use strict'

// Constants
const { USER_ERROR_MESSAGES } = require('../../constants/messages.constant')

// Models
const { BadRequestError } = require('../../models/error.response')
const userModel = require('../../models/schemas/user.schema')
const tokenModel = require('../../models/schemas/token.schema')
const productModel = require('../../models/schemas/product.schema')

class UserService {
    static getAllUsers = async (role) => {
        return await userModel
            .find()
            .where(role ? { role } : {})
            .lean()
    }

    static updateUser = async (id, data) => {
        const user = await userModel.findById(id)
        if (!user) {
            throw new BadRequestError(USER_ERROR_MESSAGES.USER_NOT_FOUND)
        }
        Object.assign(user, data)
        if (user.phone !== '' && user.address !== '' && user.email !== '' && user.name !== '') {
            user.verified = true
            await user.save()
        }
    }

    static findUserById = async (id) => {
        return await userModel.findById(id).lean()
    }

    static findUserByEmail = async (email) => {
        return await userModel.findOne({ email }).lean()
    }

    static deleteUser = async (id) => {
        const user = await userModel.findById(id)
        if (!user) {
            throw new BadRequestError(USER_ERROR_MESSAGES.USER_NOT_FOUND)
        }
        await userModel.findByIdAndDelete(id)
        await tokenModel.deleteMany({ user: id })
        await productModel.deleteMany({ user: id })
    }

    static findUserByAccount = async (account) => {
        const user = await userModel
            .findOne({
                $or: [
                    {
                        name: account
                    },
                    {
                        phone: account
                    },
                    {
                        email: account
                    }
                ]
            })
            .lean()

        return user
    }
}

module.exports = UserService
