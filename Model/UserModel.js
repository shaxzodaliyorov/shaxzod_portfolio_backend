const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}
)

module.exports = mongoose.model('Users', UserSchema)