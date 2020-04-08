import update from 'react-addons-update'

import { SUCCESS_USERS_LOADING } from '../actions/users_action.js'

const initinalStore = {
   contacts: {},
}

export default function userReducer (store = initinalStore, action) {
   switch (action.type) {

      // Load data cases
      case SUCCESS_USERS_LOADING: {
         const contacts = {}
         action.payload.forEach(user => {
            const { _id, userName, email } = user
            contacts[_id] = { userName, email }
         })
         return update(store, {
            contacts: { $set: contacts }
         })
      }

      default:
         return store
   }
}