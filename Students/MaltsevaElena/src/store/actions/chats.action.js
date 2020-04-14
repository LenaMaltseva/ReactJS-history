import { RSAA, getJSON } from 'redux-api-middleware'

export let START_CHATS_LOADING = '@@chat/START_CHATS_LOADING'
export let SUCCESS_CHATS_LOADING = '@@chat/SUCCESS_CHATS_LOADING'
export let ERROR_CHATS_LOADING = '@@chat/ERROR_CHATS_LOADING'

export let loadChats = () => ({
   [RSAA]: {
      endpoint: '/api/chat',
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      types: [
         START_CHATS_LOADING,
         {
            type: SUCCESS_CHATS_LOADING,
            payload: (action, state, res) => getJSON(res).then(json => json)
         },
         ERROR_CHATS_LOADING
      ]
   }
})

export let START_CHAT_CREATING = '@@chat/START_CHAT_CREATING'
export let SUCCESS_CHAT_CREATING = '@@chat/SUCCESS_CHAT_CREATING'
export let ERROR_CHAT_CREATING = '@@chat/ERROR_CHAT_CREATING'

export let addChat = (userId, contactId) => ({
   [RSAA]: {
      endpoint: '/api/chat',
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ participants: [userId, contactId] }),
      types: [
         START_CHAT_CREATING,
         {
            type: SUCCESS_CHAT_CREATING,
            payload: (action, state, res) => getJSON(res).then(json => json)
         },
         ERROR_CHAT_CREATING
      ]
   }
})

export let START_CHAT_DELETING = '@@chat/START_CHAT_DELETING'
export let SUCCESS_CHAT_DELETING = '@@chat/SUCCESS_CHAT_DELETING'
export let ERROR_CHAT_DELETING = '@@chat/ERROR_CHAT_DELETING'

export let deleteChat = (chatId) => ({
   [RSAA]: {
      endpoint: '/api/chat',
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({chatId}),
      types: [
         START_CHAT_DELETING,
         {
            type: SUCCESS_CHAT_DELETING,
            payload: (action, state, res) => getJSON(res).then(json => json)
         },
         ERROR_CHAT_DELETING
      ]
   }
})