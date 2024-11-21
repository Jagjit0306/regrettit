const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path : '../.env'})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })
}

module.exports = generateAccessToken