const HTTP_STATUS = {
  // 2xx Success
  OK: {
    code: 200,
    message: 'OK'
  },
  CREATED: {
    code: 201,
    message: 'Created'
  },

  // 4xx Client Error
  BAD_REQUEST: {
    code: 400,
    message: 'Bad Request Error'
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Unauthorized Error'
  },
  FORBIDDEN: {
    code: 403,
    message: 'Forbidden Error'
  },
  NOT_FOUND: {
    code: 404,
    message: 'Not Found Error'
  },
  CONFLICT: {
    code: 409,
    message: 'Conflict Error'
  },

  // 5xx Server Error
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal Server Error'
  }
}

module.exports = HTTP_STATUS
