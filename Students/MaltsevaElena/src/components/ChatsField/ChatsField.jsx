import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Styles, UI
import { AppBar, 
         Box,
         Button,
         CircularProgress,
         Dialog, DialogActions, DialogContent, DialogTitle, 
         List, 
         Input, InputBase,
         IconButton, 
         Toolbar } from '@material-ui/core'
import { AddCircle, Search } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   root: {
      borderRight: '4px solid rgba(0, 0, 0, .1)',
   },
   chatList: {
      height: 'calc(100vh - 145px)',
      padding: theme.spacing(1, 0),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.common.white
   },
   grow: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
   },
   search: {
      borderBottom: '1px solid rgba(255, 255, 255, .2)'
   },
   inputSearch: {
      color: 'inherit',
      padding: theme.spacing(1),
   },
   addBtn: {
      marginRight: theme.spacing(1),
      color: theme.palette.common.white,
   },
   cancelBtn: {
      color: theme.palette.secondary.light
   },
}))

// Children components
import Chat from '../Chat/Chat.jsx'
import Navigation from '../ChatsNavigation/ChatsNavigation.jsx'

class ChatList extends Component {
   static propTypes = {
      currentUser: PropTypes.object.isRequired,
      chatId: PropTypes.string,
      chatRooms: PropTypes.object.isRequired,
      isLoading: PropTypes.bool.isRequired,
      addChat: PropTypes.func.isRequired,
      deleteChat: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      classes: PropTypes.object
   }

   state = {
      openDialog: false,
      inputChatTitle: '',
      inputSearch: ''
   }

   handleNavigate = (link) => {
      this.props.push(link)
   }
   
   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   handleKeyUp = (event) => {
      if (event.keyCode === 13) {
         this.handleAddChat()
      }
   }

   handleAddChat = () => {
      if ( this.state.inputChatTitle !== '') {
         this.props.addChat(this.state.inputChatTitle, this.props.currentUser.userId)
         this.setState({ inputChatTitle: '' })
         this.handleClickOpenClose()
      }
   }

   handleClickOpenClose = () => {
      this.setState({ openDialog: !this.state.openDialog })
   }

   render() {
      const { currentUser, chatId, chatRooms, deleteChat, classes } = this.props

      let ChatRoomsArr = []
      Object.keys(chatRooms).forEach(chatRoomId => {
         if (chatRooms[chatRoomId] !== undefined ) {
            let chatMessages = chatRooms[chatRoomId].messageList
            let lastMsgIndex = chatMessages.length - 1
         
            ChatRoomsArr.push( 
               <Chat 
                  handleNavigate={ this.handleNavigate }
                  chatRoomId={ chatRoomId }
                  deleteChat={ deleteChat }
                  title={ chatRooms[chatRoomId].title }
                  lastMessage={ chatMessages.length ? chatMessages[lastMsgIndex].text : '* No messages yet *'}
                  isSelected={ chatId === chatRoomId }
                  key={ chatRoomId }
               />
            )
         }
      })

      let ChatRoomsFiltered = []
      if (this.state.inputSearch !== '') {
         let searchRequest = new RegExp(this.state.inputSearch, 'gi')
         ChatRoomsFiltered = ChatRoomsArr.filter(room => {
            return searchRequest.test(room.props.title)
         })
      } else ChatRoomsFiltered = ChatRoomsArr

      return (
         <Box className={ classes.root }>

            {/* Header: create and search functions */}
            <AppBar position="static" className={ classes.grow }>
               <Toolbar className={ classes.search }>
                  <IconButton aria-label="create" edge="start" className={ classes.addBtn }
                     onClick={ this.handleClickOpenClose }>
                     <AddCircle />
                  </IconButton>
                  <Search />
                  <InputBase aria-label="search" className={ classes.inputSearch }
                     name="inputSearch"
                     placeholder="Search..."
                     onChange={ this.handleChange }
                     value={ this.state.inputSearch }
                  />
               </Toolbar>
            </AppBar>

            {/* Popup: creating new chat */}
            <Dialog fullWidth open={ this.state.openDialog } onClose={ this.handleClickOpenClose }>
               <DialogTitle>Create new chat</DialogTitle>
               <DialogContent>
                  <Input autoFocus fullWidth margin="dense"
                     name="inputChatTitle"
                     placeholder="Type chat's title here..."
                     onChange={ this.handleChange }
                     onKeyUp={ this.handleKeyUp }
                     value={ this.state.inputChatTitle }
                  />
               </DialogContent>
               <DialogActions>
                  <Button onClick={ this.handleClickOpenClose } className={ classes.cancelBtn }>
                     Cancel
                  </Button>
                  <Button onClick={ this.handleAddChat } color="secondary">
                     Create
                  </Button>
               </DialogActions>
            </Dialog>

            {/* Main: chats list */}
            { this.props.isLoading ? <CircularProgress/> :
            <List className={ classes.chatList }>
               { ChatRoomsFiltered }
            </List> }

            {/* Footer: tabbar (bottom menu) */}
            <Navigation currentUser={ currentUser } />

         </Box>
      )
   }
}

export default withStyles(useStyles)(ChatList)