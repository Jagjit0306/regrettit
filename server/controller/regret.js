const subs = require('../models/subs')
const users = require('../models/users')
const posts = require('../models/posts')

async function NewSub(req, res) {
    const findSub = await subs.findOne({name: req.body.name})
    if(findSub) res.json({status:'duplicate'})
    else {
        const newsub = await subs.create({
            name: req.body.name,
            description: req.body.description,
            owner: req.userid
        })
        if(newsub) {
            res.json({status:'completed'})
        } else res.json({status:'error'})
    }
}

async function GetAllSubs(req, res) {
    const subsAll = await subs.find()
    if(subsAll) res.json({data: subsAll})
        else res.json({status:'error'})
}

async function GetSub(req, res) {
    const subdata = await subs.findOne({name: req.query.name})
    if(subdata) res.json({data:subdata})
        else res.json({status:"error"})
}

// async function GetSubPosts(req, res) {
//     const 
// }

async function GetUserById(req, res) {
    const d = await users.findById(req.query.id)
    if(d) res.json({data:d, status:'complete'})
        else res.json({status:'error'})
}

async function NewPost(req, res)  {
    const newpost = await posts.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        sub: req.body.sub,
        OP: req.userid,
        upvotes: 0,
        downvotes: 0
    })
    if(newpost) res.json({status:'complete'})
}

async function Vote(req, res) {
    const updatePost = await posts.findById(req.query.postid)
    const user = await users.findOne(req.userid)
    if(updatePost && user) {
        if(req.query.upvote){
            updatePost.upvote += 1
            let t
            if(user.upvoted) {
                t = JSON.parse(user.upvoted)
                t.append(req.query.postid)
            } else {    
                t = [req.query.postid]
            }
            user.upvoted = JSON.stringify(t)
        } 
        else {
            updatePost.downvote += 1
            let t
            if(user.downvoted) {
                t = JSON.parse(user.downvoted)
                t.append(req.query.postid)
            } else {    
                t = [req.query.postid]
            }
            user.downvoted = JSON.stringify(t)

        } 
        await updatePost.save()
        await user.save()

    } else res.json({status:'error'})
}

async function GetSubPosts(req, res) {
    const reqposts = await posts.find({sub: req.query.sub})
    if(reqposts) res.json({data:reqposts})
}

async function GetAllUsers(req, res) {
    const allusers = await users.find()
    if(allusers) res.json({data:allusers})
}

module.exports = { NewSub, GetAllSubs, GetSub, NewPost, Vote, GetUserById, GetSubPosts, GetAllUsers }