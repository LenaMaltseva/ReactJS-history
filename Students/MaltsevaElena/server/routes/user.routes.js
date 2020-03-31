const express = require('express')
const router = express.Router()

const User = require('../models/User.js')

// /user
router.get('/', async (req, res) => {
   const users = await User.find()
   users.forEach(user => {
      user.password = undefined
   })
   res.json(users)
})

module.exports = router