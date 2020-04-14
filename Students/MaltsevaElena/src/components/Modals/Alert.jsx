import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'


export default class CustomAlert extends Component {
   static propTypes = {
      severity: PropTypes.string,
      message: PropTypes.string.isRequired, 
   }

   state = {
      openSnackbar: true
   }

   handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return
      }
      this.setState({ openSnackbar: false })
   }

   componentDidUpdate (prevProps) {
      if (this.props.message !== prevProps.message) {
         this.setState({ openSnackbar: true })
      }
   }

   render () {
      return (
         <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'center'  }}
            open={ this.state.openSnackbar } 
            autoHideDuration={ 6000 } 
            onClose={ this.handleClose }
         >
            <Alert
               severity={ this.props.severity || "error" } 
               variant="outlined"
               onClose={ this.handleClose } 
            >
               { this.props.message } 
            </Alert>
         </Snackbar>
      )
   }
}