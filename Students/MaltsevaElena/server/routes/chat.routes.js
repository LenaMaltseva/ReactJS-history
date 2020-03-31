const express = require('express')
const router = express.Router()

const Chat = require('../models/Chat.js')

// /chat
router.get('/', async(req, res) => {
   const chats = await Chat.find()
   res.json(chats)
})

router.post('/', async (req, res) => {
   let chat = new Chat (req.body)
   chat = await chat.save()
   res.json(chat)
})

router.delete('/', async (req, res) => {
   await Chat.findOneAndDelete({ _id: req.body.chatId })
   await Message.deleteMany({ chatId: req.body.chatId })
   res.json({ _id: req.body.chatId })
})

module.exports = router