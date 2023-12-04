'use strict'

// Constants
const { CREATED, OK } = require('../constants/httpStatus.constant')
const { CATEGORY_MESSAGES } = require('../constants/messages.constant')

// Models
const { CreatedResponse, SuccessResponse } = require('../models/success.response')
const CategoryService = require('../services/product/category.service')

class CategoryController {
    createCategory = async (req, res) => {
        const data = await CategoryService.createCategory(req.body)
        return res.status(CREATED.code).json(
            new CreatedResponse({
                message: CATEGORY_MESSAGES.CREATE_CATEGORY_SUCCESS,
                data
            })
        )
    }

    getAllCategories = async (req, res) => {
        const data = await CategoryService.getAllCategories()
        return res.status(OK.code).json(
            new SuccessResponse({
                message: CATEGORY_MESSAGES.GET_ALL_CATEGORIES_SUCCESS,
                data
            })
        )
    }

    updateCategory = async (req, res) => {
        const { id } = req.params
        const data = await CategoryService.updateCategory(id, req.body)
        return res.status(OK.code).json(
            new SuccessResponse({
                message: CATEGORY_MESSAGES.UPDATE_CATEGORY_SUCCESS,
                data
            })
        )
    }

    deleteCategory = async (req, res) => {
        const { id } = req.params
        const data = await CategoryService.deleteCategory(id)
        return res.status(OK.code).json(
            new SuccessResponse({
                message: CATEGORY_MESSAGES.DELETE_CATEGORY_SUCCESS,
                data
            })
        )
    }
}

module.exports = new CategoryController()
