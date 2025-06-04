const express = require('express')
const router = express.Router()

const {countFollowers, displayFollowers, displayFollowings, unfollow} = require('../controllers/followerController')

router.get('/follow/:id', countFollowers)
router.get('/user/:id/followers', displayFollowers)
router.get('/user/:id/following', displayFollowings)
router.get('/unfollow/:id', unfollow)

module.exports = router