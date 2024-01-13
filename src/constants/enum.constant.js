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
    BEING_PREPARED: {
        value: 0,
        name: 'being prepared'
    },
    TO_SHIP: {
        value: 1,
        name: 'to ship'
    },
    TO_RECEIVE: {
        value: 2,
        name: 'to receive'
    },
    COMPLETED: {
        value: 3,
        name: 'completed'
    },
    CANCELLED: {
        value: 4,
        name: 'cancelled'
    }
}

module.exports = {
    USER_STATUS,
    ROLE,
    DISCOUNT_TYPE,
    ORDER_STATUS
}
