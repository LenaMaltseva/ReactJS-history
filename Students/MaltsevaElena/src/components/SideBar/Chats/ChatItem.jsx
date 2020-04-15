import React from 'react'
import { Markup } from 'interweave'

// Routing
import { push } from 'connected-react-router'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { deleteChat } from '../../../store/actions/chats.action.js'

// Styles, UI
import { Avatar, 
         Badge,
         IconButton,
         ListItem, ListItemAvatar, ListItemIcon, ListItemText, 
         Menu, MenuItem } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   root: {
      '&:hover': {
         backgroundColor: theme.palette.primary.light,
         cursor: 'pointer'
      },
      '&.Mui-selected, &.Mui-selected:hover': {
         backgroundColor: theme.palette.primary.main,
         color: theme.palette.secondary.main,
      },
   },
   avatar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main
   }
}))
 
const StyledMenuItem = withStyles(theme => ({
   root: {
      '&:hover': {
         background: 'none',
         color: theme.palette.secondary.light,
         '& > .MuiListItemIcon-root': {
            color: theme.palette.secondary.light,
         }
      }
   },
}))(MenuItem)

let ChatItem = props => {
   const classes = useStyles()
   const { chatRoomId, responder, lastMessage, isSelected, deleteChat, push } = props

   const [ anchorEl, setAnchorEl ] = React.useState(null)

   const handleClick = event => setAnchorEl(event.currentTarget)

   const handleClose = () => setAnchorEl(null)

   return (
      <ListItem divider={ true } className={ classes.root }
         selected={ isSelected ? true : false } 
         onClick={ () => push(`/chats/${chatRoomId}`) } 
      >
         
         <ListItemAvatar>
            <Badge color="secondary" overlap="circle" variant="dot"
               invisible={ responder.status === 'offline' ? true : false }
               children={ <Avatar className={ classes.avatar } children={ responder.userName[0].toUpperCase() }/> } 
            />
         </ListItemAvatar>
            
         {/* </ListItemAvatar> */}
         <ListItemText 
            primary={ responder.userName } 
            primaryTypographyProps={{ noWrap: true }}
            secondary={ 
               <Markup 
                  content={ lastMessage.text ? `${lastMessage.sender}: ${lastMessage.text}` : '* No messages yet *' } 
                  noHtml={ true } tagName="span"
               /> 
            } 
            secondaryTypographyProps={{ noWrap: true }}
         />

         {/* Chat's actions */}
         { isSelected && 
            <IconButton aria-label="display more actions" edge="end"
               onClick={ handleClick }
               children={ <MoreIcon /> }
            />
         }

         <Menu elevation={ 5 } getContentAnchorEl={ null }
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            transformOrigin={{ vertical: 'center', horizontal: 'right' }}
            anchorEl={ anchorEl }
            open={ !!anchorEl }
            onClose={ handleClose } 
         >   
            <StyledMenuItem onClick={ () => deleteChat(chatRoomId) }>
               <ListItemIcon children={ <DeleteIcon /> }/>
               <ListItemText primary="Delete" />
            </StyledMenuItem>
         </Menu>

      </ListItem>
   )
}

const mapDespatchToProps = dispatch => bindActionCreators({ deleteChat, push }, dispatch)

export default connect(null, mapDespatchToProps)(ChatItem)