import update from 'react-addons-update'

import { SUCCESS_REGISTER,
         SUCCESS_LOGIN,
         ERROR_REGISTER,
         ERROR_LOGIN,
         LOGOUT } from '../actions/auth_action.js'
import { SUCCESS_CHATS_LOADING,
         SUCCESS_CHAT_CREATING,
         SUCCESS_CHAT_DELETING,
         ERROR_CHATS_LOADING,
         ERROR_CHAT_CREATING,
         ERROR_CHAT_DELETING } from '../actions/chats_action.js'
import { SUCCESS_USERS_LOADING,
         ERROR_USERS_LOADING } from '../actions/users_action.js'
import { SUCCESS_MESSAGE_SENDING,
         ERROR_MESSAGE_SENDING } from '../actions/messages_action.js'

const initialStore = {
   response: {},
}

export default function responseReducer (store = initialStore, action) {
   switch (action.type) {
      
      // Set response
      case SUCCESS_REGISTER:
      case ERROR_REGISTER:
      case ERROR_LOGIN:
      case ERROR_CHATS_LOADING:
      case ERROR_CHAT_CREATING:
      case ERROR_CHAT_DELETING:
      case ERROR_USERS_LOADING:
      case ERROR_MESSAGE_SENDING: {
         let { message, status } = action.payload
         status = status ? status : 0

         return update(store, {
            response: { $set: { message, status} }
         })
      }
      
      // Clear response
      case LOGOUT:
      case SUCCESS_LOGIN:
      case SUCCESS_CHATS_LOADING:
      case SUCCESS_CHAT_CREATING:
      case SUCCESS_CHAT_DELETING:
      case SUCCESS_USERS_LOADING:
      case SUCCESS_MESSAGE_SENDING: {
         return update(store, { 
            reqResult: { $set: {} },
         })
      }

      default:
         return store
   }
}