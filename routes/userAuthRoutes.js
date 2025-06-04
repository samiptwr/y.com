const express = require('express')
const router = express.Router()

const {registerUser, loginUser, logoutUser} = require('../controllers/userAuthController')

//register
router.get('/register', (req, res) => {
    res.render('register')
})
    .post('/register', registerUser)

//login
router.get('/login', (req, res) => {
    res.render('login')
})  
    .post('/login', loginUser)

router.get('/logout', logoutUser)

module.exports = router