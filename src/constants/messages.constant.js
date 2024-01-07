const AUTH_MESSAGES = {
    SIGNUP_SUCCESS: 'Signup successfully',
    LOGIN_SUCCESS: 'Login successfully',
    LOGOUT_SUCCESS: 'Logout successfully'
}

const AUTH_ERROR_MESSAGES = {
    TOKEN_NOT_FOUND: 'Token not found',
    PASSWORD_NOT_MATCH: 'Password and confirm password not match',
    PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters'
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
    PRODUCT_NOT_FOUND: 'Product not found',
    PRODUCT_VARIANT_NOT_FOUND: 'Product variant not found',
    PRODUCT_VARIANT_REQUIRED: 'Product variant is required'
}

const REVIEW_MESSAGES = {
    CREATE_REVIEW_SUCCESS: 'Create review successfully',
    GET_ALL_REVIEWS_OF_PRODUCT_SUCCESS: 'Get all review of product successfully',
    UPDATE_REVIEW_SUCCESS: 'Update review successfully',
    DELETE_REVIEW_SUCCESS: 'Delete review successfully'
}

const REVIEW_ERROR_MESSAGES = {
    REVIEW_NOT_FOUND: 'Review not found'
}

const DISCOUNT_MESSAGES = {
    GET_ALL_DISCOUNTS_SUCCESS: 'Get all discounts successfully',
    APPLY_DISCOUNT_SUCCESS: 'Apply discount successfully',
    CREATE_DISCOUNT_SUCCESS: 'Create discount successfully',
    UPDATE_DISCOUNT_SUCCESS: 'Update discount successfully',
    DELETE_DISCOUNT_SUCCESS: 'Delete discount successfully'
}

const DISCOUNT_ERROR_MESSAGES = {
    DISCOUNT_ALREADY_EXISTS: 'Discount already exists',
    DISCOUNT_NOT_FOUND: 'Discount not found',
    DISCOUNT_INACTIVE: 'Discount is inactive',
    DISCOUNT_MAX_USES: 'Discount has reached maximum uses',
    DISCOUNT_NOT_STARTED: 'Discount not started',
    DISCOUNT_EXPIRED: 'Discount expired',
    DISCOUNT_NOT_ACTIVE: 'Discount not active',
    DISCOUNT_MIN_ORDER_VALUE: 'Order value is not enough to apply discount'
}

const ORDER_MESSAGES = {
    CREATE_ORDER_SUCCESS: 'Create order successfully',
    GET_ALL_ORDERS_SUCCESS: 'Get all orders successfully',
    GET_DETAIL_ORDER_SUCCESS: 'Get detail order successfully',
    UPDATE_ORDER_SUCCESS: 'Update order successfully',
    DELETE_ORDER_SUCCESS: 'Delete order successfully'
}

const ORDER_ERROR_MESSAGES = {
    ORDER_NOT_FOUND: 'Order not found'
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
    PRODUCT_ERROR_MESSAGES,
    REVIEW_MESSAGES,
    REVIEW_ERROR_MESSAGES,
    DISCOUNT_MESSAGES,
    DISCOUNT_ERROR_MESSAGES,
    ORDER_MESSAGES,
    ORDER_ERROR_MESSAGES
}
