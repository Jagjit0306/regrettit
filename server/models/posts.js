const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    image: {
        type: String
    },
    sub: {
        type: String
    },
    comments: {
        type: String
    },
    OP: {
        type:String,
        required: true
    },
    upvotes: {
        type:Number
    },
    downvotes: {
        type:Number
    }
}, {timestamps: true})

module.exports = mongoose.model('posts', postSchema)