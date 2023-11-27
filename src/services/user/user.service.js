const userModel = require('../../models/schemas/user.schema')

class UserService {
  static getAllUsers = async () => {
    return await userModel.find().lean()
  }

  static updateUser = async (id, data) => {
    const user = await userModel.findById(id)
    Object.assign(user, data)
    await user.save()
  }

  static findById = async (id) => {
    return await userModel.findById(id).lean()
  }

  static findByEmail = async (email) => {
    return await userModel.findOne({ email }).lean()
  }

  static deleteUser = async (id) => {
    await userModel.findByIdAndDelete(id)
  }
}

module.exports = UserService
