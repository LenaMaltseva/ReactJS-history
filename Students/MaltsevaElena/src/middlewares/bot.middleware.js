import { SUCCESS_MESSAGE_SENDING, sendMessage } from '../store/actions/messages_action.js'

export default store => next => (action) => {
   switch (action.type) {

      case SUCCESS_MESSAGE_SENDING:

         const currentStore = store.getState()

         const currentUserId = currentStore.authReducer.currentUser._id
         const chats = currentStore.chatReducer.chatRooms

         let welcomeChatId = ''
         Object.keys(chats).forEach(chatId => 
            chats[chatId].type === 'default'
            ? welcomeChatId = chatId
            : ''
         )

         if (action.payload.sender === currentUserId && action.payload.chatId === welcomeChatId) {
            setTimeout(() => store.dispatch(
               sendMessage(
                  "5e7dd46dc765d9e2edaedc74",   // botId
                  answersLib[ Math.round(Math.random() * answersLib.length + 1) ],
                  action.payload.chatId
               )
            ), 2000)
         }
   }
   return next(action)
}

const answersLib = [
   `We'll call you back soon (actually, not soon) (and more exactly, never - nobody reads your messages)`,
   `I'm very sorry for that (actually, I'm not - I'm just a bot, I can't feel anything)`,
   `Shit happens. Keep calm... and nothing will change :) Kisses)`,
   `Hi! There's such lovely weather outside, isn't it? Oh, sorry about that, I forgot about the quarantine! Stay home :)))`,
   `I can be your most attentive listener... cause I don't exist, oops :)`,
   `For resolve your problem try this: sing 'trololololo-ololo-ololo'... I hope it works :) or you feel better at least`,
   `All our employees are busy now, please hold on.`,
]