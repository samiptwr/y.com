
const Post = require('../models/post')

const displayIndex = async (req, res) => {
    const posts = await Post.find().populate('user').sort({createdAt: -1})
    if(!posts){
        req.session.message = {message: 'No posts found!!', type: 'danger'}
    } 
    res.render('index', {posts})
}

module.exports = displayIndex