const User = require('../models/User.js')

module.exports = {
   
   async loadUsers (req, res) {
      try {
         const users = await User.find().sort({ userName: 1 })
         users.forEach(user => { user.password = undefined })

         res.json(users)

      } catch (err) {
         res.status(500).json({ message: 'Something get wrong, try again', err })
      }
   },
}