const refreshTokens = require('../models/tokens')
const users = require('../models/users')

const generateAccessToken = require('../functions/generateAccessToken')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path: '../.env'})

async function Token (req, res) {
    const refreshToken= req.cookies.RT
    if (refreshToken == null) res.sendStatus(401)
    const tokenCheck = await refreshTokens.findOne({token:refreshToken})
    if(tokenCheck) {
        console.log('Refresh token verified')
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
            if (err) res.sendStatus(403) // token invalid
            else {
                const accessToken = generateAccessToken({userid: user.userid})
                res.cookie('AT', accessToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: 'true',
                    path: '/'
                })
                res.json({status: 'complete'})
            }
        })
    }
    else {
        res.sendStatus(403) //token not found in database
    }
}

async function UsernameCheck(req, res) {
    if(!req.query.username) res.sendStatus(401)
    else {
        const duplicateUser = await users.findOne({username: req.query.username})
        if(duplicateUser) res.json({exists:true})
        else res.json({exists:false})
    }
}

async function ValidateToken(req, res) {
    if(!req.cookies.RT) res.sendStatus(401)
    else {
        const validity = await refreshTokens.findOne({token: req.cookies.RT})
        if(!validity) res.json({validity: false})
        else res.json({validity: true})
    }
}

module.exports = { Token, UsernameCheck, ValidateToken }