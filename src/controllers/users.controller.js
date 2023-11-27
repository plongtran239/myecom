'use strict'

// Models
const { SuccessResponse } = require('../models/success.response')

// Constants
const { OK } = require('../constants/httpStatus.constant')
const { USER_MESSAGES } = require('../constants/messages.constant')

// Services
const UserService = require('../services/user/user.service')

class UsersController {
  getAllUsers = async (req, res) => {
    const data = await UserService.getAllUsers()
    return res.status(OK.code).json(
      new SuccessResponse({
        message: USER_MESSAGES.GET_ALL_USERS_SUCCESS,
        data
      })
    )
  }

  getDetailUser = async (req, res) => {
    const { id } = req.params
    const data = await UserService.findById(id)
    return res.status(OK.code).json(
      new SuccessResponse({
        message: USER_MESSAGES.GET_DETAIL_USER_SUCCESS,
        data
      })
    )
  }

  getProfile = async (req, res) => {
    const { userId } = req.decodedUser
    const data = await UserService.findById(userId)
    return res.status(OK.code).json(
      new SuccessResponse({
        message: USER_MESSAGES.GET_PROFILE_SUCCESS,
        data
      })
    )
  }

  updateUser = async (req, res) => {
    const { id } = req.params
    const data = await UserService.updateUser(id, req.body)
    return res.status(OK.code).json(
      new SuccessResponse({
        message: USER_MESSAGES.UPDATE_USER_SUCCESS,
        data
      })
    )
  }

  deleteUser = async (req, res) => {
    const { id } = req.params
    const data = await UserService.deleteUser(id)
    return res.status(OK.code).json(
      new SuccessResponse({
        message: USER_MESSAGES.DELETE_USER_SUCCESS,
        data
      })
    )
  }
}

module.exports = new UsersController()
