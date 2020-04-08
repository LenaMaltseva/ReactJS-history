import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Routing
import { Switch, Route, Redirect } from 'react-router-dom'

// Store
import connect from 'react-redux/es/connect/connect'

// Components
import App from '../components/App.jsx'
import Auth from '../components/Auth.jsx'

class Router extends Component {
   static propTypes = {
      currentUser: PropTypes.object,
   }

   render() {
      if (this.props.currentUser._id) {
         return (
            <Switch>
               <Route exact path="/chats" component={ App } />
               <Route path="/chats/:chatId" 
                     render={ obj => <App chatId={ obj.match.params.chatId } /> } />
               <Route exact path="/contacts" component={ App } />
               <Redirect to="/chats" />
            </Switch>
         )
      }
      return (
         <Switch>
            <Route exact path="/" component={ Auth } />
            <Redirect to="/" />
         </Switch>
      )
   }
}

const mapStateToProps = ({ authReducer }) => ({ currentUser: authReducer.currentUser })
export default connect(mapStateToProps)(Router)