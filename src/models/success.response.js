'use strict'

const { OK, CREATED } = require('../constants/httpStatus.constant')

class SuccessResponse {
  constructor({ status = OK, message, data }) {
    this.status = status
    this.message = message
    this.data = data
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({ status = CREATED, message, data }) {
    super({ status, message, data })
  }
}

module.exports = { SuccessResponse, CreatedResponse }
