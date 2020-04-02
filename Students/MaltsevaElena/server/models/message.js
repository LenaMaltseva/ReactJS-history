const { Schema, model, Types } = require('mongoose')

const messageSchema = new Schema ({
   sender: { type: Types.ObjectId, ref: 'User', required: true },
   text: { type: String, required: true },
   created: { type: Date, default: Date.now },
   chatId: { type: Types.ObjectId, ref: 'Chat', required: true },
})

module.exports = model('Message', messageSchema)