'use strict'

const { Schema, model } = require('mongoose')

const { COLLECTION_NAMES, DOCUMENT_NAMES } = require('../../constants/database.constant')

const productSchema = new Schema(
    {},
    {
        timestamps: true,
        collection: COLLECTION_NAMES.PRODUCTS
    }
)

module.exports = model(DOCUMENT_NAMES.PRODUCT, productSchema)
