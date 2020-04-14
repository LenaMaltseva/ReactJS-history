import { RSAA, getJSON } from 'redux-api-middleware'

export let START_MESSAGE_SENDING = '@@messages/START_MESSAGE_SENDING'
export let SUCCESS_MESSAGE_SENDING = '@@messages/SUCCESS_MESSAGE_SENDING'
export let ERROR_MESSAGE_SENDING = '@@messages/ERROR_MESSAGE_SENDING'

export let sendMessage = (sender, text, chatId) => ({
   [RSAA]: {
      endpoint: '/api/message',                       
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({sender, text, chatId}),
      types: [
         START_MESSAGE_SENDING,
         {
            type: SUCCESS_MESSAGE_SENDING,
            payload: (action, state, res) => getJSON(res).then(json => json)
         },
         ERROR_MESSAGE_SENDING
      ]
   }
})