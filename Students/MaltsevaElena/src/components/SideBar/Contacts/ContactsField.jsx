import React, { Component } from 'react'
import PropTypes from 'prop-types'
import socket from '../../../core/socket.js'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { loadUsers } from '../../../store/actions/users.action.js'

// Components
import ContactItem from './ContactItem.jsx'

// Styles, UI
import { CircularProgress } from '@material-ui/core'

class ContactsField extends Component {
   static propTypes = {
      currentUser: PropTypes.object.isRequired,
      loadUsers: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired,
      response: PropTypes.object,
      searchRequest: PropTypes.string,
   }

   componentDidMount () {
      this.props.loadUsers()
      socket.on('updContacts', () => this.props.loadUsers())
   }

   render() {
      const { currentUser, isLoading, contacts, searchRequest } = this.props
      
      const ContactsArr = []
      Object.keys(contacts).forEach(contactId => {
         if (currentUser._id !== contactId) {
            ContactsArr.push( 
               <ContactItem
                  contactId={ contactId }
                  contact={ contacts[contactId] }
                  key={ contactId }
               />
            )
         }
      })

      let ContactsFilteredArr = []
      if (searchRequest !== '') {
         const searchRegExp = new RegExp(searchRequest, 'gi')
         ContactsFilteredArr = ContactsArr.filter(contact => {
            return searchRegExp.test(contact.props.contactName)
         })
      } else ContactsFilteredArr = ContactsArr

      return (
         <>{ isLoading 
            ? <CircularProgress/> 
            : ContactsFilteredArr
         }</>
      )
   }
}

const mapStateToProps = ({ authReducer, userReducer,responseReducer }) => ({
   currentUser: authReducer.currentUser,
   isLoading: userReducer.isLoading,
   contacts: userReducer.contacts,
   response: responseReducer.response,
})
const mapDispatchToProps = dispatch => bindActionCreators({ loadUsers }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContactsField)