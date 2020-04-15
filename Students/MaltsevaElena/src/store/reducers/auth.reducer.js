import update from 'react-addons-update'
import socket from '../../core/socket.js'

import { SUCCESS_REGISTER,
         ERROR_REGISTER,
         SUCCESS_LOGIN,
         ERROR_LOGIN,
         LOGOUT } from '../actions/auth.action.js'

const initinalStore = {
   currentUser: {},
   successRegistered: false,
   registerErrors: [],
}

export default function authReducer (store = initinalStore, action) {
   switch (action.type) {

      case SUCCESS_REGISTER: {
         return update(store, {
            successRegistered: { $set: true },
         })
      }
      case ERROR_REGISTER: {
         const registerErrors = []
         action.payload.errors 
            ? action.payload.errors.forEach(error => registerErrors.push(error)) 
            : ""
         return update(store, {
            successRegistered: { $set: false },
            registerErrors: { $set: registerErrors },
         })
      }

      case SUCCESS_LOGIN: {
         const { user, token } = action.payload

         localStorage.setItem('token', token)
         socket.emit('setOnline', user._id)

         return update(store, {
            successRegistered: { $set: false },
            currentUser: { $set: { ...user } },
         })
      }
      case ERROR_LOGIN: {
         return update(store, {
            successRegistered: { $set: false },
         })
      }

      case LOGOUT: {
         localStorage.removeItem('token')
         socket.emit('setOffline', action.payload.userId)

         return update(store, {
            currentUser: { $set: {} },
         })
      }
      default:
         return store
   }
}