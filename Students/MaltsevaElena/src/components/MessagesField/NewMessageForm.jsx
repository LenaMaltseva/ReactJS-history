import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { sendMessage } from '../../store/actions/messages.action.js'

// Styles, UI
import { Input, 
         IconButton, 
         Box } from '@material-ui/core'
import { Send, 
         SentimentVerySatisfiedRounded, 
         AttachmentRounded } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   sendForm: {
      maxHeight: '64px',
      position: 'static',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 2, 0, 2)
   }
}))

class Layout extends Component {
   static propTypes = {
      currentUser: PropTypes.object.isRequired,
      chatId: PropTypes.string,
      sendMessage: PropTypes.func.isRequired,
      classes: PropTypes.object
   }
   
   state = {
      inputMessage: '',
   }

   newMessage = (sender, text) => {
      this.props.sendMessage(sender, text, this.props.chatId)
   }

   handleNewMessage = (sender, text) => {
      this.setState({ inputMessage: ''})
      if (text.length > 0) this.newMessage(sender, text)
   }

   handleChange = (event) => {
      if (event.keyCode !== 13) {
         this.setState({ inputMessage: event.target.value })
      } else {
         this.newMessage(this.props.currentUser._id, this.state.inputMessage)
         this.setState({ inputMessage: ''})
      }
   }

   render() {
      const { currentUser, classes } = this.props

      return (
         <Box className={ classes.sendForm }>

            <Box width="85%" mr={2}>
               <Input placeholder="Type your message..."
                  autoFocus={ true }
                  fullWidth={ true }
                  onChange={ this.handleChange } 
                  onKeyUp={ this.handleChange }
                  value={ this.state.inputMessage } />
            </Box>

            <IconButton aria-label="send" 
               onClick={ () => this.handleNewMessage(currentUser._id, this.state.inputMessage) }
            >
               <Send />
            </IconButton>

            <IconButton disabled aria-label="smile">
               <SentimentVerySatisfiedRounded />
            </IconButton>
            
            <IconButton disabled aria-label="attachment" >
               <AttachmentRounded />
            </IconButton>

         </Box>
      )
   }
}

const mapStateToProps = ({ authReducer }) => ({
   currentUser: authReducer.currentUser,
})
const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Layout))