const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path: '../.env'})

const generateAccessToken = require('./generateAccessToken')

const refreshTokens = require('../models/tokens.js')

async function authorizeNewUser(res, userPayLoad) {
    const accessToken = generateAccessToken(userPayLoad)
    const refreshToken= jwt.sign(userPayLoad, process.env.REFRESH_TOKEN_SECRET)

    const dt = new Date( Date.now() + 24*60*60000 )
    const newToken = await refreshTokens.create({
        expiresAfter: dt,
        token: refreshToken
    })
    if(newToken) {
        res.cookie('AT', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: 'true',
            path: '/'
        })
        res.cookie('RT', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: 'true',
            path: '/'
        })
        res.json({status:'complete'})
    }
    else res.sendStatus(500) //internal error for when token couldnt be saved
}

module.exports = authorizeNewUser