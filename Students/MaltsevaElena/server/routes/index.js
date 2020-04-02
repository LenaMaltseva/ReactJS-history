const express = require('express')
const router = express.Router()
const isAuth = require('../middlewares/auth.middleware.js')

router.use('/auth', require('./auth.routes.js'))
router.use('/chat', [isAuth, require('./chat.routes.js')])
router.use('/message', [isAuth, require('./message.routes.js')])
router.use('/user', [isAuth, require('./user.routes.js')])

module.exports = router