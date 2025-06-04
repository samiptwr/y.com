const Post = require('../models/post')

const addLikes = async (req, res) => {
    const postId = req.params.id
    if(!req.session.user){
        req.session.message = {message: 'First log in to interact with the post!', type: 'danger'}
        return res.redirect('/')
    }
    const likingUserId = req.session.user._id
    
    const postData = await Post.findById(postId).populate('likedUsers').populate('dislikedUsers').populate('user')
    
    if(postData.likedUsers.some(likedUser => likedUser._id.toString() === likingUserId.toString())){
        await Post.findByIdAndUpdate(postId, {$pull: {likedUsers: likingUserId}})
        await Post.findByIdAndUpdate(postId, {$inc: { likes: -1}})
        await Post.findByIdAndUpdate(postId, {$inc: {totalLikes: 1}})
        return res.redirect('/')
    }
    if(postData.dislikedUsers.some(dislikedUser => dislikedUser._id.toString() === likingUserId.toString())){
        await Post.findByIdAndUpdate(postId, {$pull: {dislikedUsers: likingUserId}})
        await Post.findByIdAndUpdate(postId, {$push: {likedUsers: likingUserId}})
        await Post.findByIdAndUpdate(postId, {$inc: {likes: 1}})
        await Post.findByIdAndUpdate(postId, {$inc: {dislikes: -1}})
        return res.redirect('/')
    }
    await Post.findByIdAndUpdate(postId, {$inc : {likes : 1}})
    await Post.findByIdAndUpdate(postId, {$push: {likedUsers : likingUserId}})
    res.redirect('/')
}

const addDislikes = async (req, res) => {
    const postId = req.params.id
    if(!req.session.user){
        req.session.message = {message: 'First log in to interact with the post!', type: 'danger'}
        return res.redirect('/')
    }

    const dislikingUserId = req.session.user._id
    const postData= await Post.findById(postId).populate('dislikedUsers').populate('likedUsers')

    if(postData.dislikedUsers.some(dislikeUser => dislikeUser._id.toString() === dislikingUserId.toString())){
        await Post.findByIdAndUpdate(postId, {$inc: {dislikes: -1}})
        await Post.findByIdAndUpdate(postId, {$pull: {dislikedUsers: dislikingUserId}})
        return res.redirect('/')
    }
    if(postData.likedUsers.some(likedUser => likedUser._id.toString() === dislikingUserId.toString())){
        await Post.findByIdAndUpdate(postId, {$inc: {likes: -1}})
        await Post.findByIdAndUpdate(postId, {$pull: {likedUsers: dislikingUserId}})
        await Post.findByIdAndUpdate(postId, {$inc: {dislikes: 1}})
        await Post.findByIdAndUpdate(postId, {$push: {dislikedusers: dislikingUserId}}) 
        return res.redirect('/')
    }
    await Post.findByIdAndUpdate(postId, {$inc : {dislikes: 1}})
    await Post.findByIdAndUpdate(postId, {$push : {dislikedUsers: dislikingUserId}})
    res.redirect('/')
}

const deletePosts = async (req, res) => {
    const postId = req.params.id
    const deletedPost = await Post.findByIdAndDelete(postId)
    if(!deletedPost){
        req.session.message = {message:  'Post wasnot deleted!!', type: 'danger'}
        const userId = req.session.user._id
        return res.redirect(`/user/${userId}`)
    }
    req.session.message = {message:'Post was deleted!!', type:'success'}
    const userId = req.session.user._id
    return res.redirect(`/user/${userId}`)
}

module.exports = {addLikes, addDislikes, deletePosts}