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
    PASSWORD_INCORRECT: 'Password is incorrect',
    USER_NOT_FOUND: 'User not found'
}

const REQUEST_ERROR_MESSAGES = {
    INVALID_AUTHENTICATION: 'Invalid authentication'
}

const CATEGORY_MESSAGES = {
    GET_ALL_CATEGORIES_SUCCESS: 'Get all categories successfully',
    CREATE_CATEGORY_SUCCESS: 'Create category successfully',
    UPDATE_CATEGORY_SUCCESS: 'Update category successfully',
    DELETE_CATEGORY_SUCCESS: 'Delete category successfully'
}

const CATEGORY_ERROR_MESSAGES = {
    CATEGORY_ALREADY_EXISTS: 'Category already exists',
    CATEGORY_NOT_FOUND: 'Category not found'
}

const PRODUCT_MESSAGES = {
    GET_ALL_PRODUCTS_SUCCESS: 'Get all products successfully',
    GET_DETAIL_PRODUCT_SUCCESS: 'Get detail product successfully',
    CREATE_PRODUCT_SUCCESS: 'Create product successfully',
    UPDATE_PRODUCT_SUCCESS: 'Update product successfully',
    DELETE_PRODUCT_SUCCESS: 'Delete product successfully'
}

const PRODUCT_ERROR_MESSAGES = {
    PRODUCT_ALREADY_EXISTS: 'Product already exists',
    PRODUCT_NOT_FOUND: 'Product not found'
}

module.exports = {
    AUTH_MESSAGES,
    AUTH_ERROR_MESSAGES,
    USER_MESSAGES,
    USER_ERROR_MESSAGES,
    REQUEST_ERROR_MESSAGES,
    CATEGORY_MESSAGES,
    CATEGORY_ERROR_MESSAGES,
    PRODUCT_MESSAGES,
    PRODUCT_ERROR_MESSAGES
}
