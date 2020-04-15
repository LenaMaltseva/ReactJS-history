import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import connect from 'react-redux/es/connect/connect'

// Components
import Header from './Header.jsx'
import MessagesList from './MessagesList.jsx'
import NewMessageForm from './NewMessageForm.jsx'

// Styles, UI
import { Box } from '@material-ui/core'
import { ForumRounded } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   messagesBlock: {
      height: '100vh',
   },
   emptyBlock: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
}))

class MessagesLayout extends Component {
   static propTypes = {
      currentUser: PropTypes.object,
      chatId: PropTypes.string,
      chatRooms: PropTypes.object,
      classes: PropTypes.object
   }

   render() {
      const { currentUser, chatId, chatRooms, classes } = this.props

      let responder = ''
      if (chatId && chatRooms[chatId]) { 
         chatRooms[chatId].participants.forEach(user => (
            user._id === currentUser._id ? '' : responder = { ...user }
         ))
      }

      return (
         <div className={ classes.messagesBlock }>
            {/* Shown while chat isn't selected */}
            { (!chatId || !chatRooms[chatId]) && 
               <Box className={ classes.emptyBlock }>
                  <ForumRounded fontSize="large"/>
                  Select a chat or create new one<br/>to start conversation
               </Box> 
            }

            {/* Shown when chat is selected */}
            { (chatId && chatRooms[chatId]) && <>
               <Header responder={ responder }/>
               <MessagesList messages={ chatRooms[chatId].messageList }/>
               <NewMessageForm chatId={ chatId }/>
            </>}
         </div>
      )
   }
}

const mapStateToProps = ({ authReducer, chatReducer }) => ({
   currentUser: authReducer.currentUser,
   chatRooms: chatReducer.chatRooms,
})

export default connect(mapStateToProps)(withStyles(useStyles)(MessagesLayout))