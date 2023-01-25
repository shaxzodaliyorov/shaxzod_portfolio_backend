const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    auth: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)


const PostModel = model('posts', postSchema)

module.exports = PostModel