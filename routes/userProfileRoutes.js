const express = require('express')
const router = express.Router()

const {displayUserDatas, editUsersPersonalInfo, displayUsersPersonalInfo} = require('../controllers/userProfileController')

router.get('/user/:id', displayUserDatas)
router.get('/edit/:id', displayUsersPersonalInfo)
    .post('/edit/:id', editUsersPersonalInfo)

module.exports = router