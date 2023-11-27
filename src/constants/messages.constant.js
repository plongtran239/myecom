const AUTH_MESSAGES = {
  SIGNUP_SUCCESS: 'Signup successfully',
  LOGIN_SUCCESS: 'Login successfully',
  LOGOUT_SUCCESS: 'Logout successfully'
}

const AUTH_ERROR_MESSAGES = {
  TOKEN_NOT_FOUND: 'Token not found'
}

const USER_MESSAGES = {
  GET_ALL_USERS_SUCCESS: 'Get all users successfully',
  GET_DETAIL_USER_SUCCESS: 'Get detail user successfully',
  GET_PROFILE_SUCCESS: 'Get profile successfully',
  UPDATE_USER_SUCCESS: 'Update user successfully',
  DELETE_USER_SUCCESS: 'Delete user successfully'
}

const USER_ERROR_MESSAGES = {
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_NOT_FOUND: 'Email not found',
  PASSWORD_INCORRECT: 'Password is incorrect'
}

const REQUEST_ERROR_MESSAGES = {
  INVALID_AUTHENTICATION: 'Invalid authentication'
}

module.exports = { AUTH_MESSAGES, AUTH_ERROR_MESSAGES, USER_MESSAGES, USER_ERROR_MESSAGES, REQUEST_ERROR_MESSAGES }
