const allowedOrigins = [
    "http://localhost:3000",
    `http://localhost:${process.env.FRONTEND_PORT}`,
]

module.exports = allowedOrigins