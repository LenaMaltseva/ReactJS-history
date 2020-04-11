const express = require('express')
const router = express.Router()

const message = require('../controllers/message.controller.js')

// /message
router.post('/', message.addMessage)

module.exports = router