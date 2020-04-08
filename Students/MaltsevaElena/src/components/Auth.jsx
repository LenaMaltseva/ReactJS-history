import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { registerNewUser, loginUser } from '../store/actions/auth_action.js'

// Components
import Alert from './Alert.jsx'

// Styles, UI
import { Paper, 
         Tabs, Tab,
         TextField,
         Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   root: {
      width: '350px',
      padding: theme.spacing(1, 0),
   },
   form: {
      padding: theme.spacing(0, 4, 2, 4),
   },
   submitBtn: {
      color: theme.palette.text.main,
      margin: theme.spacing(3, 1, 0, 0),
      '&:hover': {
         color: theme.palette.secondary.main,
      },
   },
   clearBtn: {
      color: theme.palette.text.secondary,
      margin: theme.spacing(3, 0, 0, 0),
      '&:hover': {
         color: theme.palette.secondary.light,
      },
   },
}))

class Auth extends Component {
   static propTypes = {
      registerNewUser: PropTypes.func.isRequired, 
      registerErrors: PropTypes.array,
      successRegistered: PropTypes.bool.isRequired,
      loginUser: PropTypes.func.isRequired,
      authMessage: PropTypes.string,
      classes: PropTypes.object
   }

   state = {
      tabValue: 0,
      userName: '',
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      showAlert: false,
   }

   handleChangeTab = (event, newValue) => {
      this.setState({ tabValue: newValue })
   }

   handleChangeInput = event => {
      this.setState({ [event.target.name]: event.target.value })
   }

   handleClear = () => {
      this.setState({ 
         userName: '', 
         email: '', 
         password: '',
         emailError: '',
         passwordError: '',
      })
   }

   validateEmail = () => {
      const emailPattern = new RegExp(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/, 'i')

      if (this.state.email && !emailPattern.test(this.state.email)) {
         this.setState({ emailError: 'invalid email address' })
      } else this.setState({ emailError: '' })
   }

   validatePassword = () => {
      if (this.state.password && this.state.password.length < 6) {
         this.setState({ passwordError: 'length is less than 6 characters' })
      } else this.setState({ passwordError: '' })
   }

   isValidate = () => {
      const { userName, email, emailError, password, passwordError } = this.state
      return (userName && email && password) ? (!emailError && !passwordError) : false
   }

   handleRegister = () => {
      const { userName, email, password } = this.state
      this.props.registerNewUser(userName, email, password)
   }

   handleLogin = () => {
      const { userName, password } = this.state
      this.props.loginUser(userName, password)
   }

   componentDidUpdate (prevProps) {
      if (this.props.authMessage !== prevProps.authMessage) {
         this.setState({ showAlert: true })
      }

      if (this.props.registerErrors && this.props.registerErrors !== prevProps.registerErrors) {
         this.props.registerErrors.forEach(err => {
            if (err.param === 'email') {
               this.setState({ emailError: err.msg })
            } else if (err.param === 'password') {
               this.setState({ passwordError: err.msg }) 
            }
         })
      }

      if (this.props.successRegistered !== prevProps.successRegistered) {
         this.setState({ tabValue: 0, emailError: '', passwordError: '' })
      }
   }

   render () {
      const { successRegistered, authMessage, classes } = this.props
      const { tabValue, userName, email, password, emailError, passwordError, showAlert } = this.state

      return (
         <div className="container container_position__center">
            <Paper square elevation={10} className={ classes.root } >

               <Tabs centered
                  name="tabValue"
                  value={ tabValue }
                  indicatorColor="secondary"
                  textColor="secondary"
                  onChange={ this.handleChangeTab }
               >
                  <Tab label="Login" />
                  <Tab label="Register" />
               </Tabs>

               <form noValidate autoComplete="off" className={ classes.form } >
                  <TextField fullWidth margin="normal" color="secondary"
                     required={ Boolean(tabValue) ? true : false }
                     label="User name" 
                     name="userName" 
                     type="text"
                     value={ userName }
                     onChange={ this.handleChangeInput }
                  />
                  { Boolean(tabValue) && 
                     <TextField fullWidth required margin="normal" color="secondary"
                        label="Email address" name="email" type="email"
                        error={ Boolean(emailError) }
                        helperText={ emailError ? emailError : "example@mail.com"}
                        value={ email }
                        onChange={ this.handleChangeInput }
                        onBlur={ this.validateEmail }
                     />
                  }
                  <TextField fullWidth margin="normal" color="secondary"
                     required={ Boolean(tabValue) ? true : false }
                     label="Password" name="password" type="password" 
                     error={ Boolean(passwordError) }
                     helperText={ Boolean(tabValue) ? (passwordError ? passwordError : "minimum 6 characters") : "" }
                     value={ password }
                     onChange={ this.handleChangeInput }
                     onBlur={ this.validatePassword }
                  />
                  <Button className={ classes.submitBtn }
                     onClick={ tabValue ? this.handleRegister : this.handleLogin }
                     disabled={ tabValue ? (this.isValidate() ? false : true) : false }
                  >
                     Submit
                  </Button>
                  <Button className={ classes.clearBtn } onClick={ this.handleClear } >
                     Clear
                  </Button>
               </form>
               
            </Paper>

            { showAlert && 
               <Alert 
                  severity={ successRegistered ? "success" : "error"} 
                  message={ authMessage }
               /> 
            }
            
         </div>
      )
   }
}

const mapStateToProps = ({ authReducer }) => ({
   successRegistered: authReducer.successRegistered,
   registerErrors: authReducer.registerErrors,
   authMessage: authReducer.authMessage,
})
const mapDespatchToProps = dispatch => bindActionCreators( { 
   registerNewUser, loginUser
}, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(withStyles(useStyles)(Auth))