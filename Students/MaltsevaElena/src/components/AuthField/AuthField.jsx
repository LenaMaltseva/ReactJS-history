import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import AuthForm from './AuthForm.jsx'

// Styles, UI
import { Paper, Tabs, Tab } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   root: {
      width: '350px',
      padding: theme.spacing(1, 0),
   },
}))

class AuthField extends Component {
   static propTypes = {
      classes: PropTypes.object
   }

   state = {
      tabValue: 0,
   }

   handleChangeTab = (event, newValue) => {
      this.setState({ tabValue: newValue })
   }
 
   componentDidUpdate (prevProps) {

      if (this.props.successRegistered !== prevProps.successRegistered) {
         this.setState({ tabValue: 0 })
      }
   }

   render () {
      return (
         <Paper square elevation={10} className={ this.props.classes.root } >

            <Tabs centered
               name="tabValue"
               value={ this.state.tabValue }
               indicatorColor="secondary"
               textColor="secondary"
               onChange={ this.handleChangeTab }
            >
               <Tab label="Login" />
               <Tab label="Register" />
            </Tabs>

            <AuthForm formType={ this.state.tabValue ? "register" : "login" }/>
            
         </Paper>
      )
   }
}

export default withStyles(useStyles)(AuthField)