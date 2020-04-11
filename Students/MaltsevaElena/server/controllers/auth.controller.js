const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/User.js')
const chat = require('../controllers/chat.controller.js')

module.exports = {
   
   async register (req, res) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Invalid registration data'
            })
         }

         const { userName, email, password } = req.body
         
         const candidate = await User.findOne({ email })
         if (candidate) {
            return res.status(400).json({ message: 'The user already exists' })
         }

         const hashedPassword = await bcrypt.hash(password, 12)
         const user = new User({ userName, email, password: hashedPassword })
         await user.save()
         user.password = undefined

         res.status(201).json({ user, message: 'Registration has completed successfully' })

         chat.addWelcomeChat(user._id)
         
      } catch (err) {
         res.status(500).json({ message: 'Something get wrong, try again', err })
      }
   },

   async login (req, res) {
      try {
         const { userName, password } = req.body

         const user = await User.findOne({ userName })
         if (!user) {
            return res.status(400).json({ message: 'The user is not found' })
         }

         const isMatchPassword = await bcrypt.compare(password, user.password)
         if (!isMatchPassword) {
            return res.status(400).json({ message: 'Invalid password' })
         }

         const token = jwt.sign(
            { userId: user._id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
         )
         user.password = undefined
         res.json({ user, token })

      } catch (err) {
         res.status(500).json({ message: 'Something get wrong, try again', err })
      }
   }
}