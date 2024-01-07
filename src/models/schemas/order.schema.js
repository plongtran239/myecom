const { Schema, model } = require('mongoose')

const { COLLECTION_NAMES, DOCUMENT_NAMES } = require('../../constants/database.constant')
const { ORDER_STATUS } = require('../../constants/enum.constant')

const orderStatusEnum = Object.values(ORDER_STATUS).map((value) => value.toLowerCase())

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: DOCUMENT_NAMES.USER
        },
        discount: {
            type: Schema.Types.ObjectId,
            ref: DOCUMENT_NAMES.DISCOUNT,
            default: null
        },
        order_lines: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: DOCUMENT_NAMES.PRODUCT
                },
                variants: {
                    type: Array,
                    default: []
                },
                quantity: {
                    type: Number
                },
                sub_total: {
                    type: Number
                }
            }
        ],
        status: {
            type: String,
            enum: orderStatusEnum,
            default: ORDER_STATUS.BEING_PREPARED
        },
        sub_total: {
            type: Number,
            default: 0
        },
        discount_value: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        },
        delivery_address: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAMES.ORDERS
    }
)

module.exports = model(DOCUMENT_NAMES.ORDER, orderSchema)
