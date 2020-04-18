const express = require('express')
const router = express.Router()

const chat = require('../controllers/chat.controller.js')

// /api/chat
router.get('/', chat.loadChats)
router.post('/', chat.addNewChat)
router.delete('/', chat.deleteChat)

module.exports = router