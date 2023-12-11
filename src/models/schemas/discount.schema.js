'use strict'

const { Schema, model } = require('mongoose')

const { COLLECTION_NAMES, DOCUMENT_NAMES } = require('../../constants/database.constant')

const discountSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            enum: ['fixed', 'percentage'],
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        is_active: {
            type: Boolean,
            default: false
        },
        max_use: {
            type: Number,
            default: 0
        },
        uses_count: {
            type: Number,
            default: 0
        },
        users_uses: {
            type: [Schema.Types.ObjectId],
            ref: DOCUMENT_NAMES.USER,
            default: []
        },
        min_order_value: {
            type: Number,
            default: 0
        },
        start_date: {
            type: Date
        },
        end_date: {
            type: Date
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAMES.DISCOUNTS
    }
)

module.exports = model(DOCUMENT_NAMES.DISCOUNT, discountSchema)
