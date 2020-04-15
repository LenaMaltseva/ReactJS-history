import React from 'react'

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
      },
   },
}))

let ContactItem = props => {
   const classes = useStyles()
   const { contactId, contact, currentUser, addChat, push } = props

   return (
      <Box className={ classes.root }>
         <ListItem divider={ true } 
            onClick={ () => {
               addChat(currentUser._id, contactId)
               push('/')
            } } 
         >
            <ListItemText 
               primary={ contact.userName }
               primaryTypographyProps={{ noWrap: true }}
               secondary={ contact.status }
               secondaryTypographyProps={{ noWrap: true, color: (contact.status === 'online' ? 'secondary' : 'textSecondary') }}
            />
            <IconButton aria-label="start conversation" edge="end" children={ <Add /> }/>
         </ListItem>
      </Box>
   )
}

const mapStateToProps = ({ authReducer }) => ({ currentUser: authReducer.currentUser })
const mapDispatchToProps = dispatch => bindActionCreators({ addChat, push }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem)