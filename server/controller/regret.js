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

async function GetUserById(req, res) {
    const d = await users.findById(req.query.id)
    if(d) res.json({data:d, status:'complete'})
        else res.json({status:'error'})
}

async function GetUserByUsername(req, res) {
    const d = await users.findOne({username: req.query.username})
    if(d) res.json({data:d, status: 'complete'})
        else res.json({status:"error"})
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
    const user = await users.findById(req.userid)
    if(updatePost && user) {
        let upvoted = false
        let downvoted = false
        let upvotedlist = []
        let downvotedlist = []
        if(user.upvoted) {
            upvotedlist = JSON.parse(user.upvoted)
        }
        if(user.downvoted) {
            downvotedlist = JSON.parse(user.downvoted)
        }
        if(upvotedlist.includes(req.query.postid)) upvoted = true
        else if(downvotedlist.includes(req.query.postid)) downvoted = true

        if (upvoted && req.query.upvote === 'false') {
            upvotedlist = upvotedlist.filter(e => e != req.query.postid);
            updatePost.upvotes -= 1;
            user.upvoted = JSON.stringify(upvotedlist);
        
            downvotedlist.push(req.query.postid);
            updatePost.downvotes += 1;
            user.downvoted = JSON.stringify(downvotedlist);
        } else if (downvoted && req.query.upvote === 'true') {
            downvotedlist = downvotedlist.filter(e => e != req.query.postid);
            updatePost.downvotes -= 1;
            user.downvoted = JSON.stringify(downvotedlist);
        
            upvotedlist.push(req.query.postid);
            updatePost.upvotes += 1;
            user.upvoted = JSON.stringify(upvotedlist);
        } else if (!upvoted && req.query.upvote === 'true') {
            upvotedlist.push(req.query.postid);
            updatePost.upvotes += 1;
            user.upvoted = JSON.stringify(upvotedlist);
        } else if (!downvoted && req.query.upvote === 'false') {
            downvotedlist.push(req.query.postid);
            updatePost.downvotes += 1;
            user.downvoted = JSON.stringify(downvotedlist);
        } else if (upvoted && req.query.upvote === 'true') {
            upvotedlist = upvotedlist.filter(e => e != req.query.postid);
            updatePost.upvotes -= 1;
            user.upvoted = JSON.stringify(upvotedlist);
        } else if (downvoted && req.query.upvote === 'false') {
            downvotedlist = downvotedlist.filter(e => e != req.query.postid);
            updatePost.downvotes -= 1;
            user.downvoted = JSON.stringify(downvotedlist);
        }
        
        await user.save();
        await updatePost.save();
        
        res.json({status:'complete', newvotes: updatePost.upvotes-updatePost.downvotes})
    } else res.json({status:'error'})
}

async function VoteStatus(req, res) {
    let statuscode = 1 // 1 for not interacted, 2 for upvoted and 3 for downvoted
    const you = await users.findById(req.userid)
    if(you) {
        if(you.upvoted){
            let ups = JSON.parse(you.upvoted)
            if(ups.includes(req.query.postid)) statuscode = 2
        }
        if(you.downvoted){
            let downs = JSON.parse(you.downvoted)
            if(downs.includes(req.query.postid)) statuscode = 3
        }
    }
    res.json({statuscode:statuscode})
}

async function GetSubPosts(req, res) {
    const reqposts = await posts.find({sub: req.query.sub})
    if(reqposts) res.json({data:reqposts})
}

async function GetAllUsers(req, res) {
    const allusers = await users.find()
    if(allusers) res.json({data:allusers})
}

async function GetPostsFromUser(req, res) {
    const userposts = await posts.find({OP:req.query.userid})
    if(userposts) res.json({data:userposts})
}

module.exports = { NewSub, GetAllSubs, GetSub, NewPost, Vote, GetUserById, GetUserByUsername, GetSubPosts, GetAllUsers, GetPostsFromUser, VoteStatus }