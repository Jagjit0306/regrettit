const users = require('../models/users')
const bcryptjs = require('bcryptjs')

async function authenticateUser(req, res, next) {
    const userFound = await users.findOne({username: req.body.username})
    if (!userFound) res.sendStatus(401) // user doesnt exist
    else {
        const match = await bcryptjs.compare(req.body.password, userFound.password)
        if(!match) res.sendStatus(401) //incorrect password
        else {
            req.userid = userFound.id
            next()
        }
    }
}

module.exports = authenticateUser