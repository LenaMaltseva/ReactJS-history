import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Routing
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { logoutUser } from '../../store/actions/auth.action.js'

// Components
import Dialog from '../Modals/Dialog.jsx'

// Styles, UI
import { AppBar, 
        Toolbar, 
        IconButton, 
        Menu, MenuItem, 
        ListItemIcon, ListItemText,
        Box } from '@material-ui/core'
import { ForumRounded, 
        AccountCircleRounded, 
        Settings, 
        ExitToApp,
        Face } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
  appBar: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    borderColor: theme.palette.primary.main
  },
  toolbar: {
    justifyContent: 'space-around'
  },
  activeMenu: {
    backgroundColor: 'none',
    color: theme.palette.secondary.main
  },
}))

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
  },
}))(MenuItem)

class Navigation extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    logoutUser: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    classes: PropTypes.object,
  }

  state = {
    anchorEl: null,
    openDialog: false,
    activeItem: '',
  }

  handleNavigate = link => {
    this.props.push(link)
    this.setState({ activeItem: link.substr(1) })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleOpenClose = () => {
    this.setState({ openDialog: !this.state.openDialog })
  }

  componentDidMount () {
    const link = this.props.location.pathname.substr(1).split('/')[0]
    this.setState({ activeItem: link })
  }

  render () {
    const { currentUser, logoutUser, classes } = this.props
    const { anchorEl, openDialog, activeItem } = this.state

    return (
      <><AppBar position="static" color="primary" className={ classes.appBar }>
        <Toolbar className={ classes.toolbar }>

          <IconButton
            className={ activeItem === 'chats' ? classes.activeMenu : '' } 
            onClick={ () => this.handleNavigate(`/chats`) }
            children={ <ForumRounded /> }
          />
          
          <IconButton
            className={ activeItem === 'contacts' ? classes.activeMenu : ''  }
            onClick={ () => this.handleNavigate(`/contacts`) }
            children={ <AccountCircleRounded /> }
          />
          
          <IconButton 
            onClick={ this.handleClick }
            children={ <Settings /> }
          />

          {/* Settings menu */}
          <Menu elevation={ 5 } getContentAnchorEl={ null }
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            anchorEl={ anchorEl }
            open={ !!anchorEl }
            onClose={ this.handleClose } >

            <StyledMenuItem onClick={ this.handleOpenClose }>
              <ListItemIcon children={ <Face /> }/>
              <ListItemText primary="My account" />
            </StyledMenuItem>

            <StyledMenuItem onClick={ () => logoutUser() }>
              <ListItemIcon children={ <ExitToApp /> }/>
              <ListItemText primary="Log out" />
            </StyledMenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      {/* Popup: account info */}
      <Dialog
        open={ openDialog } 
        handleClick={ this.handleOpenClose }
        title="Account info"
        content={<>
          <Box m={ 1 }>
            Name: { currentUser.userName }
          </Box>
          <Box m={ 1 }>
            Email: { currentUser.email }
          </Box>
        </>}
        cancelBtnTxt="Close"
        submitBtnTxt="Edit"
        submitAction={ this.handleNewChat }
      /></>
    )
  }
}
const mapStateToProps = ({ authReducer }) => ({ currentUser: authReducer.currentUser })
const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser, push }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(Navigation)))