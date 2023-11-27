'use strict'

const { INTERNAL_SERVER_ERROR } = require('../constants/httpStatus.constant')

const defaultErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR.code
  const message = err.message || INTERNAL_SERVER_ERROR.message
  res.status(statusCode).json({
    statusCode,
    message
  })
}

module.exports = defaultErrorHandler
