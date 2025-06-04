
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')

//connect to mongodb db
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err))

//middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public'))

//express-sessions
app.use(expressSession({
    secret: 'YiscompetetorofX',
    resave: false,
    saveUninitialized: true
}))
app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})
app.use((req, res, next)=> {
    if(req.session.user){
        res.locals.isLogged = true
        res.locals.userId = req.session.user._id
        res.locals.username = req.session.user.username
    } else {
        res.locals.isLogged = false
        res.locals.userId = null
        res.locals.username = null
    }
    next()
})

//routes
app.use('/', require('./routes/userAuthRoutes'))
app.use('/', require('./routes/userProfileRoutes'))
app.use('/', require('./routes/indexRoutes'))
app.use('/', require('./routes/addPostRoutes'))
app.use('/', require('./routes/optionsRoutes'))
app.use('/', require('./routes/followerRoutes'))

app.listen(process.env.PORT || 5000, () => console.log('Server is listening at port 5000...'))