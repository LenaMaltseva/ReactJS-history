import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import connect from 'react-redux/es/connect/connect'

// Components
import MessageItem from './MessageItem.jsx'

// Styles, UI
import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   msgBlock: {
      height: 'calc(100vh - 160px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: theme.spacing(2)
   },
   msgList: {
      overflow: 'auto'
   }
}))

class MessagesField extends Component {
   static propTypes = {
      currentUser: PropTypes.object.isRequired,
      messages: PropTypes.array,
      classes: PropTypes.object,
   }

   msgList = React.createRef()

   scrollToNewMsg () {
      if (this.msgList.current && this.msgList.current.lastChild) {
         this.msgList.current.lastChild.scrollIntoView({block: 'end', behavior: 'smooth'})
      }
   }

   componentDidMount () {
      this.scrollToNewMsg()
   }
   
   componentDidUpdate () {
      this.scrollToNewMsg()
   }

   render() {
      const { currentUser, messages, classes } = this.props

      let messageItems = messages.map(message => (
            <MessageItem 
               senderId={ message.sender } 
               text={ message.text } 
               created={ message.created }
               currentUserId={ currentUser._id }
               key={ message._id }
            /> 
         )
      )

      return (
         <Box className={ classes.msgBlock }>
            <Box ref={ this.msgList } 
               className={ classes.msgList } 
               children={ messageItems }
            />
         </Box>
      )
   }
}

const mapStateToProps = ({ authReducer }) => ({ currentUser: authReducer.currentUser })

export default connect(mapStateToProps)(withStyles(useStyles)(MessagesField))