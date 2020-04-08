import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

// Components
import ControlPanel from './ControlPanel'
import MessagesField from './MessagesField'

export default class App extends Component {
   static propTypes = {
      chatId: PropTypes.string,
   }

   render () {
      return (
         <div className="container">
            <Grid container spacing={0}>
               <Grid item xs={4}>
                  <ControlPanel chatId={ this.props.chatId }/>
               </Grid>
               <Grid item xs={8}>
                  <MessagesField chatId={ this.props.chatId }/>
               </Grid>
            </Grid>
         </div>
      )
   }
}