const { Login, Register, Logout } = require('./controller/initial')
const { Token, UsernameCheck, ValidateToken } = require('./controller/basic')
const { NewSub, GetAllSubs, GetSub, NewPost, Vote, GetUserById, GetUserByUsername, GetSubPosts, GetAllUsers, GetPostsFromUser, VoteStatus, IsFollowSub, FollowSub, HomePage } = require('./controller/regret')

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

router.post('/newsub', authenticateToken, NewSub)

router.get('/getallsubs', authenticateToken, GetAllSubs)

router.get('/getsub', authenticateToken, GetSub)

router.post('/newpost', authenticateToken, NewPost)

router.get('/vote', authenticateToken, Vote)

router.get('/getuserbyid', authenticateToken, GetUserById)

router.get('/getuserbyusername', authenticateToken, GetUserByUsername)

router.get('/getsubposts', authenticateToken, GetSubPosts)

router.get('/getallusers', authenticateToken, GetAllUsers)

router.get('/getuserposts', authenticateToken, GetPostsFromUser)

router.get('/votestatus', authenticateToken, VoteStatus)

router.get('/isfollowsub', authenticateToken, IsFollowSub)

router.get('/followsub', authenticateToken, FollowSub)

router.get('/homepage', authenticateToken, HomePage)

module.exports = router