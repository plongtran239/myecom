'use strict'

const { Schema, model } = require('mongoose')

const { COLLECTION_NAMES, DOCUMENT_NAMES } = require('../../constants/database.constant')

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAMES.CATEGORIES
    }
)

module.exports = model(DOCUMENT_NAMES.CATEGORY, categorySchema)
