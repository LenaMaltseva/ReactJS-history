import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      searchRequest: PropTypes.string,
   }

   componentDidMount () {
      this.props.loadUsers()
   }

   render() {
      const { currentUser, isLoading, contacts, searchRequest } = this.props
      
      const ContactsArr = []
      Object.keys(contacts).forEach(contactId => {
         if (currentUser._id !== contactId) {
            ContactsArr.push( 
               <ContactItem
                  contactId={ contactId }
                  contactName={ contacts[contactId].userName }
                  contactEmail={ contacts[contactId].email }
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

const mapStateToProps = ({ authReducer, userReducer }) => ({
   currentUser: authReducer.currentUser,
   isLoading: userReducer.isLoading,
   contacts: userReducer.contacts,
})
const mapDespatchToProps = dispatch => bindActionCreators({ loadUsers }, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(ContactsField)