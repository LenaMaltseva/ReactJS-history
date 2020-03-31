const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth.routes.js'))
router.use('/chat', require('./chat.routes.js'))
router.use('/message', require('./message.routes.js'))
router.use('/user', require('./user.routes.js'))

module.exports = router