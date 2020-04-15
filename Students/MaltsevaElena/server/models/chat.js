const { Schema, model, Types } = require('mongoose')

const chatSchema = new Schema ({
   type: {type: String, default: 'custom'},
   messageList: [{ type: Types.ObjectId, ref: 'Message' }],
   participants: [{ type: Types.ObjectId, required: true, ref: 'User' }],
})

chatSchema.post('find', async docs => {
   for(let doc of docs) {
      await doc
      .populate('messageList')
      .populate('participants', ['_id', 'userName', 'status'])
      .execPopulate()
   }
})

chatSchema.post('save', async (doc, next) => {
   await doc
   .populate('participants', ['_id', 'userName', 'status'])
   .execPopulate()
   next()
})

module.exports = model('Chat', chatSchema)