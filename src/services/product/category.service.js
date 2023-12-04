const { CATEGORY_ERROR_MESSAGES } = require('../../constants/messages.constant')
const { BadRequestError } = require('../../models/error.response')
const categoryModel = require('../../models/schemas/category.schema')

class CategoryService {
    static createCategory = async ({ name }) => {
        const existedCategory = await this.findByName(name)
        if (existedCategory) {
            throw new BadRequestError(CATEGORY_ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS)
        }
        return await categoryModel.create({ name })
    }

    static getAllCategories = async () => {
        return await categoryModel.find().lean()
    }

    static updateCategory = async (id, data) => {
        const category = await categoryModel.findById(id)
        if (!category) {
            throw new BadRequestError(CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND)
        }
        Object.assign(category, data)
        return await category.save()
    }

    static deleteCategory = async (id) => {
        const category = await categoryModel.findById(id)
        if (!category) {
            throw new BadRequestError(CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND)
        }
        return await categoryModel.findByIdAndDelete(id)
    }

    static findByName = async (name) => {
        return await categoryModel.findOne({ name }).lean()
    }
}

module.exports = CategoryService