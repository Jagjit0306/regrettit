const mongoose = require('mongoose')

const subSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    members: {
        type: String
    },
    owner: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('subs', subSchema)