import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { sendMessage } from '../../store/actions/messages_action.js'
import { loadChats, addChat, deleteChat } from '../../store/actions/chats_action.js'
import { push } from 'connected-react-router'

// Components
import Messages from '../MessagesField/MessagesField.jsx'
import ChatList from '../ChatsField/ChatsField.jsx'

class Layout extends Component {
   static propTypes = {
      currentUser: PropTypes.object.isRequired,
      loadChats: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired,
      chatId: PropTypes.string,
      chatRooms: PropTypes.object.isRequired,
      addChat:PropTypes.func.isRequired,
      deleteChat: PropTypes.func.isRequired,
      sendMessage: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
   }

   componentDidMount () {
      this.props.loadChats()
   }

   render () {
      let { currentUser, isLoading, chatId, chatRooms, addChat, deleteChat, sendMessage, push } = this.props

      return (
         <div className="container">
            <Grid container spacing={0}>
               <Grid item xs={3}>
                  <ChatList 
                     currentUser={ currentUser }
                     chatId={ chatId } 
                     chatRooms={ chatRooms } 
                     isLoading={ isLoading } 
                     addChat={ addChat }
                     deleteChat={ deleteChat } 
                     push={ push } />
               </Grid>
               <Grid item xs={9}>
                  <Messages 
                     currentUser={ currentUser }
                     chatId={ chatId } 
                     chatData={ chatId ? chatRooms[chatId] : {} }
                     sendMessage={ sendMessage } />
               </Grid>
            </Grid>
         </div>
      )
   }
}

const mapStateToProps = ({ chatReducer, userReducer }) => ({
   currentUser: userReducer.currentUser,
   isLoading: chatReducer.isLoading,
   chatRooms: chatReducer.chatRooms,
})
const mapDespatchToProps = dispatch => bindActionCreators( { 
   loadChats, addChat, deleteChat, sendMessage, push 
}, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(Layout)