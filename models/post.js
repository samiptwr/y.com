const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    content: {  
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
    dislikes:{
        type: Number,
        default: 0 
    },
    comments: [{
        type: String,
        createdAt: {type: Date, default: Date.now}
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    dislikedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema)