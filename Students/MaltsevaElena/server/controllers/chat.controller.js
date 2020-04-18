const Chat = require('../models/Chat.js')
const Message = require('../models/Message.js')
const User = require('../models/User')

module.exports = {
   
   async loadChats (req, res) {
      try {
         const chats = await Chat.find({ participants: req.user.userId }).sort({ messageList: -1 })
         res.json(chats)
         
      } catch (err) {
         res.status(500).json({ message: 'Something get wrong, try again', err })
      }
   },

   async addNewChat (req, res) {
      try {
         const existChatDirect = await Chat.findOne(req.body)
         const existChatReverse = await Chat.findOne({ participants: req.body.participants.reverse() })
         if (existChatDirect || existChatReverse) {
            return res.status(400).json({ message: 'The chat already exists' })
         }

         let chat = new Chat (req.body)
         chat = await chat.save()

         res.json(chat)

      } catch (err) {
         res.status(500).json({ message: 'Something get wrong, try again', err })
      }
   },

   async addWelcomeChat (newUserId) {
      try {
         const bot = await User.findById('5e7dd46dc765d9e2edaedc74')
   
         let welcomeChat = new Chat ({ participants: [newUserId, bot._id], type: 'default' })
         welcomeChat = await welcomeChat.save()
      
         const welcomeTxt = `Welcome to Reactgram! <br/>Start a new conversation now: <br/>– switch to contacts in the left panel; <br/>– and choose any contact for creating a new chat. <br/>If you have any question - write me here :)`
      
         let welcomeMsg = new Message ({ sender: bot._id, text: welcomeTxt, chatId: welcomeChat.id })
         welcomeMsg = await welcomeMsg.save()
      
         welcomeChat.messageList.push(welcomeMsg._id)
         await welcomeChat.save()

      } catch (err) {
         res.status(500).json({ message: 'Something get wrong, try again', err })
      }
   },

   async deleteChat (req, res) {
      try {
         await Chat.findOneAndDelete({ _id: req.body.chatId })
         await Message.deleteMany({ chatId: req.body.chatId })

         res.json({ _id: req.body.chatId })

      } catch (err) {
         res.status(500).json({ message: 'Something get wrong, try again', err })
      }
   },
}