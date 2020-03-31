const express = require('express')
const router = express.Router()

const Message = require('../models/Message.js')

// /message
router.get('/', async (req, res) => {
   const messages = await Message.find()
   res.json(messages)
})

router.post('/', async (req, res) => {
   let message = new Message (req.body)
   message = await message.save()
   res.json(message)
})

module.exports = router