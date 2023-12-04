'use strict'

const { Schema, model } = require('mongoose')

const { COLLECTION_NAMES, DOCUMENT_NAMES } = require('../../constants/database.constant')

// Declare the Schema of the Mongo model
const tokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: DOCUMENT_NAMES.USER
        },
        refreshToken: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAMES.TOKENS
    }
)

module.exports = model(DOCUMENT_NAMES.TOKEN, tokenSchema)
