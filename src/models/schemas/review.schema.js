'use strict'

const { Schema, model } = require('mongoose')

const { COLLECTION_NAMES, DOCUMENT_NAMES } = require('../../constants/database.constant')

const reviewSchema = new Schema(
    {
        content: {
            type: String,
            trim: true,
            default: ''
        },
        rating: {
            type: Number,
            required: true
        },
        images: {
            type: Array,
            default: []
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: DOCUMENT_NAMES.USER,
            required: true
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: DOCUMENT_NAMES.PRODUCT,
            required: true
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAMES.REVIEWS
    }
)

module.exports = model(DOCUMENT_NAMES.REVIEW, reviewSchema)
