import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import connect from 'react-redux/es/connect/connect'

// Components
import AuthField from '../components/AuthField/AuthField.jsx'
import Alert from '../components/Modals/Alert.jsx'

class AuthLayout extends Component {
   static propTypes = {
      successRegistered: PropTypes.bool.isRequired,
      authMessage: PropTypes.string,
      classes: PropTypes.object
   }

   state = {
      showAlert: false,
   }
 
   componentDidUpdate (prevProps) {
      if (this.props.authMessage !== prevProps.authMessage) {
         this.setState({ showAlert: true })
      }
   }

   render () {
      return (
         <div className="container__centered">
            <AuthField />

            { this.state.showAlert && 
               <Alert 
                  severity={ this.props.successRegistered ? "success" : ""} 
                  message={ this.props.authMessage }
               /> 
            }
         </div>
      )
   }
}

const mapStateToProps = ({ authReducer }) => ({
   successRegistered: authReducer.successRegistered,
   authMessage: authReducer.authMessage,
})

export default connect(mapStateToProps)(AuthLayout)