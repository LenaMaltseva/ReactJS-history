const { Schema, model, Types } = require('mongoose')

const chatSchema = new Schema ({
   title: { type: String, required: true },
   messageList: [{ type: Types.ObjectId, ref: 'Message' }],
   participants: [{ type: Types.ObjectId, ref: 'User' }],
})

chatSchema.post('find', async docs => {
   for(let doc of docs) {
     await doc
      .populate('messageList')
      .populate('participants', ['_id', 'userName'])
      .execPopulate()
   }
})

module.exports = model('Chat', chatSchema)