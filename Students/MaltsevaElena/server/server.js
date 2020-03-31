const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const router = require('./routes')

const app = express()

// Middlewares
app.use(express.json({ extended: true }))
app.use(router)

const PORT = config.get('port') || 3300

async function start() {
   try {
      await mongoose.connect(config.get('mongoUri'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true
      })
      app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
   } catch (e) {
      console.log('Server Error:', e.message)
      process.exit(1)
   }
}

start()