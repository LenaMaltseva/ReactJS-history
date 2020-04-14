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
      const { successRegistered, authMessage } = this.props

      return (
         <div className="container__centered">
            <AuthField successRegistered={ successRegistered }/>

            { this.state.showAlert && 
               <Alert 
                  severity={ successRegistered ? "success" : ""} 
                  message={ authMessage }
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