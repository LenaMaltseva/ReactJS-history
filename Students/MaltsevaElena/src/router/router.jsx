import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

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
               <Route exact path="/" component={ App } />
               <Route path="/chat/:chatId" 
                     render={ obj => <App chatId={ obj.match.params.chatId } /> } />
               <Redirect to="/" />
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