import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { loadChats, addChat, deleteChat } from '../../store/actions/chats_action.js'
import { push } from 'connected-react-router'

// Components
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
      push: PropTypes.func.isRequired,
   }

   componentDidMount () {
      this.props.loadChats()
   }

   render () {
      let { currentUser, isLoading, chatId, chatRooms, addChat, deleteChat, push } = this.props

      return (
         <ChatList 
            currentUser={ currentUser }
            chatId={ chatId } 
            chatRooms={ chatRooms } 
            isLoading={ isLoading } 
            addChat={ addChat }
            deleteChat={ deleteChat } 
            push={ push } />
      )
   }
}

const mapStateToProps = ({ chatReducer, authReducer }) => ({
   currentUser: authReducer.currentUser,
   isLoading: chatReducer.isLoading,
   chatRooms: chatReducer.chatRooms,
})
const mapDespatchToProps = dispatch => bindActionCreators( { 
   loadChats, addChat, deleteChat, push 
}, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(Layout)