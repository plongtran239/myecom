'use strict'

const { Schema, model } = require('mongoose')

const { COLLECTION_NAMES, DOCUMENT_NAMES } = require('../../constants/database.constant')

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLegth: 150
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            require: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive'
        },
        verify: {
            type: Boolean,
            default: false
        },
        roles: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAMES.USERS
    }
)

module.exports = model(DOCUMENT_NAMES.USER, userSchema)
