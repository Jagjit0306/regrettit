const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path: '../.env'})

function authenticateToken(req, res, next) {
    if(req.cookies.AT == null) return res.sendStatus(401) //error code meaning they dont have access
    else {
        jwt.verify(req.cookies.AT, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if (err) {
                console.log("A Token is not valid")
                return res.sendStatus(403)} // you dont have access, token not valid
            else {
                req.userid = user.userid
                next()
            }
        })
    }
}

module.exports = authenticateToken