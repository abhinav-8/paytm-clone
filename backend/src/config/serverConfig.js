const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_KEY: process.env.JWT_KEY,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    connect: require('./db')
}
