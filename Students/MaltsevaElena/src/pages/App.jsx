import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

// Store
import connect from 'react-redux/es/connect/connect'

// Components
import SideBar from '../components/SideBar/SideBar.jsx'
import MessagesField from '../components/MessagesField/MessagesField.jsx'
import Alert from '../components/Modals/Alert.jsx'
import AuthField from '../components/AuthField/AuthField.jsx'

class AppLayout extends Component {
   static propTypes = {
      chatId: PropTypes.string,
      response: PropTypes.object,
   }

   state = {
      auth: true
   }

   componentDidUpdate (prevProps) {
      if (this.props.response.status !== prevProps.response.status)  {
         this.props.response.status === 401 ? this.setState({ auth: false }) : this.setState({ auth: true })
      }
   }

   render () {
      const { chatId, response } = this.props

      return (
         <div className="container">
            <Grid container spacing={ 0 } alignItems="center" justify="center">
               <Grid item xs={ 3 }>
                  <SideBar chatId={ chatId }/>
               </Grid>
               <Grid item xs={ 9 }>
                  <MessagesField chatId={ chatId }/>
               </Grid>

               { !this.state.auth && 
                  <AuthField successRegistered={ true }/>
               }
            </Grid>

            { response.message && 
               <Alert message={ response.message }/>
            }
         </div>
      )
   }
}

const mapStateToProps = ({ responseReducer }) => ({ response: responseReducer.response })

export default connect(mapStateToProps)(AppLayout)