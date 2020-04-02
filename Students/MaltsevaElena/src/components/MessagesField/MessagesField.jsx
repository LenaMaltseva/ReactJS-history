import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Styles, UI
import { Input, 
         IconButton, 
         Box } from '@material-ui/core'
import { Send, 
         SentimentVerySatisfiedRounded, 
         AttachmentRounded, 
         ForumRounded } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   emptyBlock: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
   msgBlock: {
      height: 'calc(100vh - 160px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: theme.spacing(2)
   },
   msgList: {
      overflow: 'auto'
   },
   sendForm: {
      maxHeight: '64px',
      position: 'static',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 2, 0, 2)
   }
}))

// Children components
import Header from '../MessagesHeader/MessagesHeader.jsx'
import Message from '../Message/Message.jsx'

class Messages extends Component {
   static propTypes = {
      currentUser: PropTypes.object.isRequired,
      chatId: PropTypes.string,
      chatData: PropTypes.object,
      sendMessage: PropTypes.func.isRequired,
      classes: PropTypes.object
   }
   
   state = {
      msg: '',
   }

   msgList = React.createRef()

   scrollToNewMsg () {
      if (this.msgList.current && this.msgList.current.lastChild) {
         this.msgList.current.lastChild.scrollIntoView({block: 'end', behavior: 'smooth'})
      }
   }

   sendMsg = (sender, text) => {
      let { chatId, sendMessage } = this.props
      sendMessage(sender, text, chatId)
   }

   handleSendMsg = (sender, text) => {
      this.setState({ msg: ''})
      if (text.length > 0) this.sendMsg(sender, text)
   }

   handleChange = (event) => {
      if (event.keyCode !== 13) {
         this.setState({ msg: event.target.value })
      } else {
         this.sendMsg(this.props.currentUser._id, this.state.msg)
         this.setState({ msg: ''})
      }
   }

   componentDidUpdate () {
      this.scrollToNewMsg()
   }

   render() {
      const { currentUser, chatId, chatData, classes } = this.props
      
      let MessagesArr = []
      if (chatId && chatData) {
         let chatMessages = chatData.messageList
         Object.keys(chatMessages).forEach(message => {
            MessagesArr.push( 
               <Message 
                  sender={ chatMessages[message].sender } 
                  text={ chatMessages[message].text } 
                  created={ chatMessages[message].created }
                  key={ chatMessages[message]._id }
                  currentUser={ currentUser }
               /> 
            )
         })
      }

      return (
         <div>
            {/* Shown while chat isn't selected */}
            { !chatId && <Box className={ classes.emptyBlock }>
               <ForumRounded fontSize="large"/>
               Select a chat or create new one<br/>to start conversation
            </Box> }

            {/* Shown when chat is selected */}
            { chatId && <div>
               {/* Header: chat's title, search and other functions */}
               <Header title={ chatData ? chatData.title : '' }/>

               {/* Main: messages history */}
               <Box className={ classes.msgBlock }>
                  <Box className={ classes.msgList } ref={ this.msgList }>
                     { MessagesArr ? MessagesArr : '' }
                  </Box>
               </Box>

               {/* Footer: new message input and additional options */}
               <Box className={ classes.sendForm }>
                  <Box width="85%" mr={2}>
                     <Input placeholder="Type your message..."
                        autoFocus={ true }
                        fullWidth={ true }
                        onChange={ this.handleChange } 
                        onKeyUp={ this.handleChange }
                        value={ this.state.msg } />
                  </Box>
                  <IconButton aria-label="send" onClick={ () => this.handleSendMsg(currentUser._id, this.state.msg) }>
                     <Send />
                  </IconButton>
                  <IconButton disabled aria-label="smile">
                     <SentimentVerySatisfiedRounded />
                  </IconButton>
                  <IconButton disabled aria-label="attachment" >
                     <AttachmentRounded />
                  </IconButton>
               </Box>
            </div> }
         </div>
      )
   }
}

export default withStyles(useStyles)(Messages)