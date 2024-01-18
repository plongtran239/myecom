'use strict'

const { Schema, model } = require('mongoose')

const { COLLECTION_NAMES, DOCUMENT_NAMES } = require('../../constants/database.constant')
const { DISCOUNT_TYPE } = require('../../constants/enum.constant')

const discountTypeEnum = Object.values(DISCOUNT_TYPE).map((value) => value.value)

const discountSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: Number,
            enum: discountTypeEnum,
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
        max_uses: {
            type: Number,
            default: 0
        },
        uses_count: {
            type: Number,
            default: 0
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
