'use strict'

const { Schema, model } = require('mongoose')

const { COLLECTION_NAMES, DOCUMENT_NAMES } = require('../../constants/database.constant')
const { USER_STATUS, ROLE } = require('../../constants/enum.constant')

const userStatusEnum = Object.values(USER_STATUS).map((value) => value.value)
const roleEnum = Object.values(ROLE).map((value) => value.value)

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLegth: 150,
            minLength: 2
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            require: true,
            trim: true,
            minLength: 8
        },
        phone: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: ''
        },
        status: {
            type: Number,
            enum: userStatusEnum,
            default: USER_STATUS.ACTIVE.value
        },
        verified: {
            type: Boolean,
            default: false
        },
        role: {
            type: Number,
            enum: roleEnum,
            default: ROLE.USER.value
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAMES.USERS
    }
)

module.exports = model(DOCUMENT_NAMES.USER, userSchema)
