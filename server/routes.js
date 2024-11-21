const { Login, Register, Logout } = require('./controller/initial')
const { Token, UsernameCheck, ValidateToken } = require('./controller/basic')

const authenticateToken = require('./functions/authenticateToken')
const authenticateUser = require('./functions/authenticateUser')

const users = require('./models/users')
async function checkDuplicateUser(req, res, next) {
    const duplicateUser = await users.findOne({username: req.body.username})
    if(duplicateUser) res.sendStatus(409) //Conflict -> duplicate user
    else next()
}
 
const express = require('express')
const router = express.Router()

router.post('/register', checkDuplicateUser, Register)

router.post('/login', authenticateUser, Login)

router.post('/logout', authenticateToken, Logout)

router.post('/token', Token)

router.get('/usernameCheck', UsernameCheck)

router.post('/validateToken', ValidateToken)

module.exports = router