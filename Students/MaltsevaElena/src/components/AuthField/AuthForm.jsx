import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { registerNewUser, loginUser } from '../../store/actions/auth.action.js'

// Styles, UI
import { TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
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

class AuthForm extends Component {
   static propTypes = {
      registerNewUser: PropTypes.func.isRequired, 
      registerErrors: PropTypes.array,
      successRegistered: PropTypes.bool,
      loginUser: PropTypes.func.isRequired,
      formType: PropTypes.string.isRequired,
      classes: PropTypes.object
   }

   state = {
      userName: '',
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
   }

   handleChangeInput = event => {
      this.setState({ [event.target.name]: event.target.value })
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

   handleClear = () => {
      this.setState({ 
         userName: '', 
         email: '', 
         password: '',
         emailError: '',
         passwordError: '',
      })
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
         this.setState({ emailError: '', passwordError: '' })
      }
   }

   render () {
      const { formType, classes } = this.props
      const { userName, email, password, emailError, passwordError } = this.state

      const register = formType === "register" ? true : false

      return (
         <form noValidate autoComplete="off" className={ classes.form } >

            <TextField fullWidth margin="normal" color="secondary"
               label="User name" name="userName" type="text"
               required={ register ? true : false }
               value={ userName }
               onChange={ this.handleChangeInput }
            />
            { register && 
               <TextField fullWidth margin="normal" color="secondary"
                  label="Email address" name="email" type="email"
                  required
                  value={ email }
                  onChange={ this.handleChangeInput }
                  onBlur={ this.validateEmail }
                  error={ !!emailError }
                  helperText={ emailError ? emailError : "example@mail.com"}
               />
            }
            <TextField fullWidth margin="normal" color="secondary"
               label="Password" name="password" type="password"
               required={ register ? true : false } 
               value={ password }
               onChange={ this.handleChangeInput }
               onBlur={ this.validatePassword }
               error={ !!passwordError }
               helperText={ register ? (passwordError ? passwordError : "minimum 6 characters") : "" }
            />

            <Button className={ classes.submitBtn }
               onClick={ register ? this.handleRegister : this.handleLogin }
               disabled={ register ? (this.isValidate() ? false : true) : false }
               children="Submit"
            />
            <Button className={ classes.clearBtn } 
               onClick={ this.handleClear } 
               children="Clear"
            />

         </form>
      )
   }
}

const mapStateToProps = ({ authReducer }) => ({ registerErrors: authReducer.registerErrors })
const mapDespatchToProps = dispatch => bindActionCreators({ registerNewUser, loginUser }, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(withStyles(useStyles)(AuthForm))