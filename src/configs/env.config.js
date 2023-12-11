require('dotenv').config()

const envConfig = {
    server_port: process.env.SERVER_PORT,
    mongodb_local_db_name: process.env.MONGODB_LOCAL_DB_NAME,
    mongodb_cloud_username: process.env.MONGODB_CLOUD_USERNAME,
    mongodb_cloud_password: process.env.MONGODB_CLOUD_PASSWORD,
    mongodb_cloud_db_name: process.env.MONGODB_CLOUD_DB_NAME,
    jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwt_access_token_expired_in: process.env.JWT_ACCESS_TOKEN_EXPIRED_IN,
    jwt_refresh_token_expired_in: process.env.JWT_REFRESH_TOKEN_EXPIRED_IN
}

module.exports = envConfig
