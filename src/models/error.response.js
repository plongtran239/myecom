'use strict'

const { BAD_REQUEST, FORBIDDEN, NOT_FOUND, CONFLICT, UNAUTHORIZED } = require('../constants/httpStatus.constant')

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = BAD_REQUEST.message) {
        super(message, BAD_REQUEST.code)
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor(message = UNAUTHORIZED.message) {
        super(message, UNAUTHORIZED.code)
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = FORBIDDEN.message) {
        super(message, FORBIDDEN.code)
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = NOT_FOUND.message) {
        super(message, NOT_FOUND.code)
    }
}

class ConflictError extends ErrorResponse {
    constructor(message = CONFLICT.message) {
        super(message, (statusCode = CONFLICT.code))
    }
}

module.exports = {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError
}
