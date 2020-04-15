import update from 'react-addons-update'
import socket from '../../core/socket.js'

import { SUCCESS_MESSAGE_SENDING } from '../actions/messages.action.js'
import { SUCCESS_CHATS_LOADING, 
         SUCCESS_CHAT_CREATING, 
         SUCCESS_CHAT_DELETING } from '../actions/chats.action.js'
import { LOGOUT } from '../actions/auth.action.js'

const initialStore = {
   chatRooms: {},
   isLoading: true,
}

export default function chatReducer (store = initialStore, action) {
   switch (action.type) {
      
      // Load data cases
      case SUCCESS_CHATS_LOADING: {
         const chatRooms = {}
         action.payload.forEach(chat => {
            const { _id, type, messageList, participants } = chat
            chatRooms[_id] = { type, messageList, participants }
         })
         return update(store, {
            chatRooms: { $set: chatRooms },
            isLoading: { $set: false }
         })
      }

      // Change data cases
      case SUCCESS_CHAT_CREATING: {
         const { _id, type, messageList, participants } = action.payload
         socket.emit('newChat')
         return update(store, {
            chatRooms: {
               $merge: { [_id]: { type, messageList, participants } }
            }
         })
      }
      case SUCCESS_CHAT_DELETING: {
         const chatRooms = { ...store.chatRooms }
         delete chatRooms[action.payload._id]
         socket.emit('deleteChat')
         return update(store, {
            chatRooms: { $set: chatRooms }
         })
      }
      case SUCCESS_MESSAGE_SENDING: {
         const { chatId } = action.payload
         socket.emit('newMessage')
         return update(store, {
            chatRooms: {
               [chatId]: { $merge:{  
                  messageList: [...store.chatRooms[chatId].messageList, action.payload] } }
            }
         })
      }

      case LOGOUT: {
         return update(store, {
            chatRooms: { $set: {} },
            isLoading: { $set: true }
         })
      }

      default:
         return store
   }
}