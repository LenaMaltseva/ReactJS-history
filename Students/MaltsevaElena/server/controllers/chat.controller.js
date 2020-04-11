const Chat = require('../models/Chat.js')
const Message = require('../models/Message.js')
const User = require('../models/User')

module.exports = {
   
   async loadChats (req, res) {
      const chats = await Chat.find({participants: req.user.userId})
      res.json(chats)
   },

   async addNewChat (req, res) {
      let chat = new Chat (req.body)
      chat = await chat.save()

      res.json(chat)
   },

   async deleteChat (req, res) {
      await Chat.findOneAndDelete({ _id: req.body.chatId })
      await Message.deleteMany({ chatId: req.body.chatId })

      res.json({ _id: req.body.chatId })
   }
}