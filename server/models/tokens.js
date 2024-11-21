const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    expiresAfter: {
        type:Date,
        required: true
    },
    token: String
}, {timestamps: true})

module.exports = mongoose.model('tokens', tokenSchema)