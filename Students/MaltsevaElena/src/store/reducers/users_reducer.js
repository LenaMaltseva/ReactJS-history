import update from 'react-addons-update'

import { SUCCESS_USERS_LOADING,
         SUCCESS_REGISTER,
         ERROR_REGISTER,
         SUCCESS_LOGIN,
         ERROR_LOGIN,
         LOGOUT } from '../actions/users_action.js'

const initinalStore = {
   contacts: {},
   currentUser: {},
   hasRegistered: false,
   registerErrors: [],
   authMessage: '',
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

      // Auth cases
      case SUCCESS_REGISTER: {
         const {_id, userName, email } = action.payload
         return update(store, {
            hasRegistered: { $set: true },
            authMessage: { $set: '' },
            contacts: {
               $merge: { [_id]: { userName, email } }
            }, 
         })
      }
      case ERROR_REGISTER: {
         const registerErrors = []
         action.payload.errors ? 
            action.payload.errors.forEach(error => registerErrors.push(error)) :
            ""
         return update(store, {
            registerErrors: { $set: registerErrors },
            authMessage: { $set: action.payload.message },
         })
      }

      case SUCCESS_LOGIN: {
         const { user, token } = action.payload
         return update(store, {
            authMessage: { $set: '' },
            currentUser: { $set: { ...user } },
         })
      }
      case ERROR_LOGIN: {
         return update(store, {
            authMessage: { $set: action.payload.message },
         })
      }
      case LOGOUT: {
         return update(store, {
            currentUser: { $set: {} },
         })
      }
      default:
         return store
   }
}