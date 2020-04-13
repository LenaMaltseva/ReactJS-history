const User = require('../models/User.js')

module.exports = {
   
   async loadUsers (req, res) {
      const users = await User.find().sort({userName: 1})
      users.forEach(user => { user.password = undefined })

      res.json(users)
   }
}