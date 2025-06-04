const User = require('../models/user')
const Post = require('../models/post')

const displayUserDatas = async (req, res) => {
    const id = req.params.id
    const userExists = await User.findById(id).populate('posts')
    if(!userExists){
        req.session.message = {message: 'User Not Found', type: 'danger'}
        return res.redirect('/')
    }
    res.render('userProfile', {userExists})
}

const editUsersPersonalInfo = async (req, res) => {
    const id = req.params.id
    const {name, email, phone_no, education, lives_in, works_at} = req.body
    const usersDataEdited = await User.findByIdAndUpdate(id, {name: name, email: email, phone_number: phone_no, education: education, lives_in: lives_in, works_at: works_at})
    if(!usersDataEdited){
        req.session.message = { message: 'Users data was not edited!', type: 'danger'}
        return res.redirect(`/edit/${id}`)
    }
    req.session.message = {message: 'User data was sucessfully edited!!', type: 'success'}
    res.redirect(`/user/${id}`)
}

const displayUsersPersonalInfo = async (req, res) => {
    const id = req.params.id
    const usersData = await User.findById(id)
    res.render('edit', {usersData})
}

module.exports = {displayUserDatas, editUsersPersonalInfo, displayUsersPersonalInfo}