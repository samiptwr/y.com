const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    lives_in:{
        type: String,
        default: null
    },
    works_at:{
        type: String,
        default: null
    },
    education:{
        type: String,
        default: null
    },
    bio: {
        type: String, 
        default: null
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    totalLikes: {
        type: Number,
        default: '0'
    },
    followers: {
        type: Number,
        default: '0'
    },
    following:{
        type: Number,
        default: '0'
    },
    followersUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    followingUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)