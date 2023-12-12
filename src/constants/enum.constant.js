const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
}

const ROLE = {
    ADMIN: 'admin',
    SELLER: 'seller',
    USER: 'user'
}

const DISCOUNT_TYPE = {
    FIXED: 'fixed',
    PERCENTAGE: 'percentage'
}

const ORDER_STATUS = {
    BEING_PREPARED: 'being prepared',
    TO_SHIP: 'to ship',
    TO_RECEIVE: 'to receive',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
}

module.exports = {
    USER_STATUS,
    ROLE,
    DISCOUNT_TYPE,
    ORDER_STATUS
}
