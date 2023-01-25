const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true
    },
    postid: {
        type: Object,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const model = mongoose.model('comments', commentsSchema)

module.exports = model