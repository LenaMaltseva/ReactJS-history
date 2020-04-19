const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const router = require('./routes')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const socketIO = require('socket.io')
const io = require('./socket.js')(socketIO(server, { origins: '*:*' }))

app.use(express.json({ extended: true }))
app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
   app.use('/', express.static(path.resolve(__dirname, '../public')))
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
   })
}

const PORT = process.env.PORT || config.get('port') || 3300

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
      process.exit(0)
   }
}

start()