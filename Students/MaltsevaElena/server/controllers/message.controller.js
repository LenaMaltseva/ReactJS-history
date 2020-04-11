const Message = require('../models/Message.js')
const Chat = require('../models/Chat.js')

module.exports = {
   
   async addMessage (req, res) {
      let message = new Message (req.body)
      message = await message.save()

      let chat = await Chat.findById(message.chatId)
      chat.messageList.push(message._id)
      await chat.save()

      res.json(message)
   }
}