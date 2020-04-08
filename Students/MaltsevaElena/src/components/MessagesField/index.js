import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import connect from 'react-redux/es/connect/connect'

// Components
import Header from './Header.jsx'
import MessagesField from './MessagesField.jsx'
import NewMessageForm from './NewMessageForm.jsx'

// Styles, UI
import { Box } from '@material-ui/core'
import { ForumRounded } from '@material-ui/icons'
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
}))

class Layout extends Component {
   static propTypes = {
      chatId: PropTypes.string,
      chatRooms: PropTypes.object,
      classes: PropTypes.object
   }

   render() {
      const { chatId, chatRooms, classes } = this.props

      return (
         <div>
            {/* Shown while chat isn't selected */}
            { !chatId && 
               <Box className={ classes.emptyBlock }>
                  <ForumRounded fontSize="large"/>
                  Select a chat or create new one<br/>to start conversation
               </Box> 
            }

            {/* Shown when chat is selected */}
            { chatId && <>
               <Header title={ chatRooms[chatId].title }/>
               <MessagesField messages={ chatRooms[chatId].messageList }/>
               <NewMessageForm chatId={ chatId }/>
            </>}
         </div>
      )
   }
}

const mapStateToProps = ({ chatReducer }) => ({ chatRooms: chatReducer.chatRooms })

export default connect(mapStateToProps)(withStyles(useStyles)(Layout))