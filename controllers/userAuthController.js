const User = require('../models/user')

const registerUser = async (req, res) => {
    const {name, username, email, password, conform_password, phone_number} = req.body
    const usernameExists = await User.findOne({username})
    const emailExists = await User.findOne({email})
    if(usernameExists){
        req.session.message = {message: 'Username already Exists!!', type: 'danger'}
        return res.redirect('/register')
    }
    if(emailExists){
        req.session.message = {message: 'Email already Exists!!', type: 'danger'}
        return res.redirect('/register')
    }
    if(password !== conform_password){
        req.session.message = {message: 'Passwords are not same!!', type: 'danger'}
        return res.redirect('/register')
    }
    if(!name && !username && !email && !password && !phone_number){
        req.session.message = {message: 'Something is missing!!', type: 'danger'}
        return res.redirect('/register')
    }
    const newUser =  new User({name, username, email, password, phone_number})
    if(!newUser) {
        req.session.message = {message: 'Something gone wrong!!', type: 'danger'}
        return res.redirect('/register')
    }
    const savedUser = await newUser.save()
    if(!savedUser){
        req.session.message = {message: 'User Not Created', type: 'danger'}
        return res.redirect('/register')
    }
    req.session.message = {message: 'User is created', type: 'success'}
    res.redirect('/login')
}

const loginUser = async (req, res) => {
    const {username, email, password} = req.body
    const usernameExists = await User.findOne({username})
    if(!usernameExists){
        req.session.message = {message: 'Username doesnot exists!!', type: 'danger'}
        res.redirect('/login') 
    }
    if(email == usernameExists.email && password == usernameExists.password){
        req.session.user = usernameExists
        return res.redirect(`/`)
    }
    req.session.message = {message: 'Email and Password are incorrect!', type:'danger'}
    res.redirect('/login')
}

const logoutUser = (req, res) => {
    delete req.session.user
    res.redirect('/')
}

module.exports = {registerUser, loginUser, logoutUser}