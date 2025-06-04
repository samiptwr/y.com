const express =require('express')
const router = express.Router()

const {addLikes, addDislikes, deletePosts} = require('../controllers/optionsController')

router.get('/like/:id', addLikes)
router.get('/dislike/:id', addDislikes)
router.get('/delete/:id', deletePosts)

module.exports = router