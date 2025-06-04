const Post = require('../models/post')
const User = require('../models/user')

const addPost = async (req, res) => {
    const newPost = req.body.new_post
    if(!newPost){
        req.session.message = {message: 'Please write sth!', type: 'danger'}
        return res.redirect('/')
    }
    const postUserId = res.locals.userId
    const canPost = new Post({content: newPost, user: postUserId})
    const posted = await canPost.save()

    if(!posted){
        req.session.message = {message: 'Post not posted!!', type: 'danger'}
        return res.redirect('/')
    }
    
    await User.findByIdAndUpdate(postUserId, {$push: {posts: posted._id}})
    req.session.message = {message: 'Post is posted!!', type: 'success'}
    res.redirect('/')
}

module.exports = addPost