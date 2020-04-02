import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import connect from 'react-redux/es/connect/connect'

import Layout from '../components/Layout/Layout.jsx'
import Auth from '../components/Auth/Auth.jsx'

class Router extends Component {
   render() {
      if (this.props.currentUser._id) {
         return (
            <Switch>
               <Route exact path="/" component={ Layout } />
               <Route path="/chat/:chatId" 
                     render={ obj => <Layout chatId={ obj.match.params.chatId } /> } />
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

const mapStateToProps = ({ userReducer }) => ({ currentUser: userReducer.currentUser })
export default connect(mapStateToProps)(Router)