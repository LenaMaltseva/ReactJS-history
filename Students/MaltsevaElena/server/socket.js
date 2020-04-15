const User = require('./models/User.js')

module.exports = function (io) {
   io.on('connection', socket => {
      console.log(`User ${socket.id} connected'`)

      socket.on('setOnline', async userId => {
         const user = await User.findByIdAndUpdate(userId, { $set: { status: 'online' } })
         await user.save()

         socket.broadcast.emit('updChatList')
         socket.broadcast.emit('updContacts')
      })

      socket.on('setOffline', async userId => {
         const user = await User.findByIdAndUpdate(userId, { $set: { status: 'offline' } })
         await user.save()

         socket.broadcast.emit('updChatList')
         socket.broadcast.emit('updContacts')
      })

      socket.on('newChat', () => {
         socket.broadcast.emit('updChatList')
         socket.emit('updChatList')
      })

      socket.on('deleteChat', () => {
         socket.broadcast.emit('updChatList')
         socket.emit('updChatList')
      })
      
      socket.on('newMessage', () => {
         socket.broadcast.emit('updChatList')
         socket.emit('updChatList')
      })

      socket.on('disconnect', () => {
         console.log(`User ${socket.id} disconnected'`)
      })
   })
}
