require("dotenv").config();

module.exports = Object.freeze({
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET, 
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
});