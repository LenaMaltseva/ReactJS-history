import { SUCCESS_MESSAGE_SENDING, sendMessage } from '../store/actions/messages_action.js'

export default store => next => (action) => {
   switch (action.type) {
      case SUCCESS_MESSAGE_SENDING:
         if (action.payload.sender !== '5e7dd46dc765d9e2edaedc74') {
            setTimeout(() => store.dispatch(
               sendMessage(
                  "5e7dd46dc765d9e2edaedc74",
                  "We'll call you back",
                  action.payload.chatId
               )
            ), 1000)
         }
   }
   return next(action)
}