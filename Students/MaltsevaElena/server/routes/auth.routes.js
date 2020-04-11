const express = require('express')
const router = express.Router()

const { check } = require('express-validator')

const auth = require('../controllers/auth.controller.js')

// /auth/register
router.post('/register',
   [
      check('email', 'invalid email address').isEmail(),
      check('password', 'length is less than 6 characters').isLength({ min: 6 })
   ],
   auth.register
)

// /auth/login
router.post('/login', auth.login)

module.exports = router