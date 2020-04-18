const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const router = require('./routes')

const app = express()
const server = require('http').createServer(app)
const socketIO = require('socket.io')
const io = require('./socket.js')(socketIO(server, { origins: '*:*' }))

app.use(express.json({ extended: true }))
app.use('/api', router)

const PORT = config.get('port') || 3300

async function start() {
   try {
      await mongoose.connect(config.get('mongoUri'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true
      })
      server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
   } catch (err) {
      console.log('Server Error:', err.message)
      process.exit(1)
   }
}

start()