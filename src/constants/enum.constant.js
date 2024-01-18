const USER_STATUS = {
    INACTIVE: {
        value: 0,
        name: 'inactive'
    },
    ACTIVE: {
        value: 1,
        name: 'active'
    }
}

const ROLE = {
    ADMIN: {
        value: 0,
        name: 'admin'
    },
    SELLER: {
        value: 1,
        name: 'seller'
    },
    USER: {
        value: 2,
        name: 'user'
    }
}

const DISCOUNT_TYPE = {
    FIXED: {
        value: 0,
        name: 'fixed'
    },
    PERCENTAGE: {
        value: 1,
        name: 'percentage'
    }
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
