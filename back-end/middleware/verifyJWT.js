require("dotenv").config();
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.user_id = decoded.UserInfo._id
            req.taken_tickets = decoded.UserInfo.taken_tickets,
            req.created_tables = decoded.UserInfo.created_tables,
            req.membered_tables = decoded.UserInfo.membered_tables
            console.log(decoded.UserInfo.created_tables);
            next()
        }
    )
}

module.exports = verifyJWT 