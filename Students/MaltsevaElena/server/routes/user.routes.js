const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller.js')

// /user
router.get('/', user.loadUsers)

module.exports = router