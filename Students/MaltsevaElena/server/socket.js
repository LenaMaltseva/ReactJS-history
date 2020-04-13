module.exports = function (io) {
   io.on('connection', socket => {
      console.log(`User ${socket.id} connected'`)

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
