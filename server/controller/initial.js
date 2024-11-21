const bcryptjs = require('bcryptjs')

const users = require('../models/users')
const refreshTokens = require('../models/tokens')
const authorizeNewUser = require('../functions/authorizeNewUser')

async function hashThis(value) {
    const salt = await bcryptjs.genSalt()
    const hashed = await bcryptjs.hash(value, salt)
    return hashed ? hashed : false
}

async function Register (req, res) {

    const hashedPW = await hashThis(req.body.password)
    if(!hashedPW) res.sendStatus(500)
    const newUser = await users.create({
        name: req.body.name,
        username: req.body.username,
        password: hashedPW,
        email: req.body.email,
        phone: req.body.phone,
    })
    if(newUser) {
        // send payload back to client
        const userPayLoad = {
            userid: newUser.id
        }
    
        await authorizeNewUser(res, userPayLoad)  
    }
    else {
        console.log("Error creating new user.")
        res.sendStatus(500)
    }
}

async function Login (req, res) {

    const userPayLoad = {
        userid: req.userid
    }

    await authorizeNewUser(res, userPayLoad)
}

async function Logout (req, res) {
    const deleteToken = await refreshTokens.findOneAndDelete({token:req.cookies.RT})
    if(deleteToken){
        res.clearCookie('AT')
        res.clearCookie('RT')
        res.sendStatus(200)
    }
    else res.sendStatus(403) //token not valid
}

module.exports = { Register, Login, Logout }