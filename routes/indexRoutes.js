const express = require('express')
const router = express.Router()

const displayIndex = require('../controllers/indexController')

router.get('/', displayIndex)

module.exports = router