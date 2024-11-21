const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    posts: {
        type: String
    },
    subs: {
        type: String        
    },
    upvoted: {
        type: String
    },
    downvoted: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)