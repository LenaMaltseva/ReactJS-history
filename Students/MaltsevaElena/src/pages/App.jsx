import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

// Store
import connect from 'react-redux/es/connect/connect'

// Components
import SideBar from '../components/SideBar/SideBar.jsx'
import MessagesField from '../components/MessagesField/MessagesField.jsx'

export default class AppLayout extends Component {
   static propTypes = {
      chatId: PropTypes.string,
   }

   render () {
      return (
         <div className="container">
            <Grid container spacing={0}>
               <Grid item xs={4}>
                  <SideBar chatId={ this.props.chatId }/>
               </Grid>
               <Grid item xs={8}>
                  <MessagesField chatId={ this.props.chatId }/>
               </Grid>
            </Grid>
         </div>
      )
   }
}