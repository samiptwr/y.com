const User = require('../models/user')

const countFollowers = async (req, res) => {
    if(!req.session.user){
        req.session.message = {message:'You should login to follow the user!!', type:'danger'}
        return res.redirect('/')
    }
    const followedId = req.params.id
    const followerId = req.session.user._id

    const followedUser = await User.findById(followedId).populate('followersUsers')
    const followerUser = await User.findById(followerId).populate('followingUsers')

    if(followedUser.followersUsers.some(user => user._id.toString() === followerId.toString())){
        req.session.message = {message:'You have already followed!!', type: 'danger'}
        return res.redirect('/')
    }
    
    if(followedId == followerId){
        req.session.message = {message: 'You cannot follow yourself!', type: 'danger'}
        return res.redirect('/')
    }

    await User.findByIdAndUpdate(followedId, {$push: {followersUsers: followerId}})
    await User.findByIdAndUpdate(followerId, {$push: {followingUsers: followedId}})
    req.session.message = {message: 'User is followed!', type:'success'}
    res.redirect('/')
}

const displayFollowers = async (req, res) => {
    const userId = req.params.id
    const followers = await User.findById(userId).populate('followersUsers')
    res.render('followers', {followers})
}

const displayFollowings = async (req, res) => {
    const userId = req.params.id
    const followings = await User.findById(userId).populate('followingUsers')
    res.render('following', {followings})
}

const unfollow = async (req, res) => {
    const userId = req.params.id
    const unfollowerId = req.session.user._id
    await User.findByIdAndUpdate(unfollowerId, {$pull:{followingUsers: userId}})
    await User.findByIdAndUpdate(userId, {$pull: {followersUsers: unfollowerId}})
    req.session.message = {message : 'User was unfollowed!', type: 'success'}
    res.redirect(`/user/${unfollowerId}/following`)
}

module.exports = {countFollowers, displayFollowers, displayFollowings, unfollow}