import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Routing
import { Switch, Route } from 'react-router-dom'

// Components
import SearchBar from './SearchBar.jsx'
import ChatsField from './Chats/ChatsField.jsx'
import ContactsField from './Contacts/ContactsField.jsx'
import NavigationBar from './NavigationBar.jsx'

// Styles, UI
import { Box, List } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   root: {
      borderRight: '4px solid rgba(0, 0, 0, .1)',
   },
   listSpace: {
      height: 'calc(100vh - 145px)',
      padding: theme.spacing(1, 0),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.common.white
   },
}))

class Layout extends Component {
   static propTypes = {
      chatId: PropTypes.string,
   }

   state = {
      inputSearch: ''
   }

   handleChange = event => {
      this.setState({ [event.target.name]: event.target.value })
   }

   render() {
      const { chatId, classes } = this.props

      return (
         <Box className={ classes.root }>

            <SearchBar
               handleChange={ this.handleChange }
               inputValue={ this.state.inputSearch }
            />

            <List className={ classes.listSpace }>
               <Switch>
                  <Route path="/chats" render={ () => 
                     <ChatsField chatId={ chatId } searchRequest={ this.state.inputSearch }/> 
                  }/>
                  <Route exact path="/contacts" render={ () =>
                     <ContactsField searchRequest={ this.state.inputSearch }/>
                  }/>
               </Switch>
            </List>

            <NavigationBar/>

         </Box>
      )
   }
}

export default withStyles(useStyles)(Layout)