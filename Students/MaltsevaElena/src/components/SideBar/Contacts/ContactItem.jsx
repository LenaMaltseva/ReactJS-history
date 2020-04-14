import React from 'react'
import socket from '../../../core/socket.js'

// Routing
import { push } from 'connected-react-router'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { addChat } from '../../../store/actions/chats.action.js'

// Styles, UI
import { Box, 
         ListItem, ListItemText, 
         IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   root: {
      '& .MuiListItem-root:hover': {
         backgroundColor: theme.palette.primary.light,
         cursor: 'pointer'
      },
      '& .Mui-selected': {
         backgroundColor: theme.palette.primary.main,
         color: theme.palette.secondary.main,
         '& .MuiListItemAvatar-root > .MuiAvatar-root': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white
         }
      },
   },
}))

let ContactItem = props => {
   const classes = useStyles()
   const { contactId, contactName, contactEmail, currentUser, addChat, push } = props

   const newChat = (userId, contactId) => {
      socket.emit('newChat')
      addChat(userId, contactId)
   }

   return (
      <Box className={ classes.root }>
         <ListItem divider={ true } 
            onClick={ () => {
               newChat(currentUser._id, contactId)
               push('/')
            } } 
         >
            <ListItemText 
               primary={ contactName }
               primaryTypographyProps={{ noWrap: true }}
               secondary={ contactEmail }
               secondaryTypographyProps={{ noWrap: true }}
            />
            <IconButton aria-label="start conversation" edge="end" children={ <Add /> }/>
         </ListItem>
      </Box>
   )
}

const mapStateToProps = ({ authReducer }) => ({ currentUser: authReducer.currentUser })
const mapDespatchToProps = dispatch => bindActionCreators({ addChat, push }, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(ContactItem)