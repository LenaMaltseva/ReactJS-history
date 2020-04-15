const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
   userName: { type: String, required: true },
   email: { type: String, required: true, unique: true, lowercase: true, trim: true },
   password: { type: String, required: true },
   status: { type: String, default: 'offline' },
})

module.exports = model('User', userSchema)