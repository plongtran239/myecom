'use strict'
const mongoose = require('mongoose')
const { countConnect } = require('../helpers/database.helper')

const connectString = require('../configs/mongodb.config').uri

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        console.log('connectString::', connectString)
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }

        mongoose
            .connect(connectString, {
                maxPoolSize: 50
            })
            .then(() => {
                console.log('Connecting MongoDB...')
                console.log('Connected MongoDB successfully')
                countConnect()
            })
            .catch((err) => {
                console.log('Connecting MongoDB...')
                console.error('Connected MongoDB failed. Error: ', err)
            })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

class singletonDatabase {
    constructor() {
        if (!singletonDatabase.instance) {
            singletonDatabase.instance = new Database()
        }
    }

    getInstance() {
        return singletonDatabase.instance
    }
}

const instanceSingleton = new singletonDatabase()
const instanceMongoDB = instanceSingleton.getInstance()

// const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB
