const Message = require('../models/Message.js')
const Chat = require('../models/Chat.js')

module.exports = {
   
   async addMessage (req, res) {
      try {
         let message = new Message (req.body)
         message = await message.save()

         let chat = await Chat.findById(message.chatId)
         chat.messageList.push(message._id)
         await chat.save()

         res.json(message)

      } catch (err) {
         res.status(500).json({ message: 'Something get wrong, try again', err })
      }
   },
}