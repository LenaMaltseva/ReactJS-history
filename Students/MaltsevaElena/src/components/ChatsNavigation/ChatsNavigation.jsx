import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { logoutUser } from '../../store/actions/users_action.js'

// Styles, UI
import { withStyles } from '@material-ui/core/styles'
import { AppBar, 
        Toolbar, 
        IconButton, 
        Button,
        Menu, MenuItem, 
        ListItemIcon, ListItemText,
        Dialog, DialogActions, DialogContent, DialogTitle, 
        Box } from '@material-ui/core'
import { ForumRounded, 
        AccountCircleRounded, 
        Settings, 
        ExitToApp,
        Face, 
        Tune } from '@material-ui/icons'

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
  }
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
    classes: PropTypes.object,
  }

  state = {
    anchorEl: null,
    openDialog: false,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleClickOpenClose = () => {
    this.setState({ openDialog: !this.state.openDialog })
  }

  render () {
    const { currentUser, logoutUser, classes } = this.props
    const { anchorEl } = this.state

    return (
      <><AppBar position="static" color="primary" className={ classes.appBar }>
        <Toolbar className={ classes.toolbar }>
          <IconButton color="secondary">
            <ForumRounded />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleRounded />
          </IconButton>
          
          {/* Settings menu */}
          <IconButton color="inherit" onClick={ this.handleClick }>
            <Settings />
          </IconButton>
          <Menu elevation={ 5 } getContentAnchorEl={ null }
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            anchorEl={ anchorEl }
            open={ Boolean(anchorEl) }
            onClose={ this.handleClose } >
            <StyledMenuItem onClick={ this.handleClickOpenClose }>
              <ListItemIcon>
                <Face fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="My account" />
            </StyledMenuItem>
            <StyledMenuItem disabled>
              <ListItemIcon>
                <Tune fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="General settings" />
            </StyledMenuItem>
            <StyledMenuItem onClick={ () => logoutUser() }>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </StyledMenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      {/* Popup: account info */}
      <Dialog maxWidth="xs" open={ this.state.openDialog } onClose={ this.handleClickOpenClose }>
        <DialogTitle>Account info</DialogTitle>
        <DialogContent>
          <Box m={ 1 }>
            Name: { currentUser.userName }
          </Box>
          <Box m={ 1 }>
            Email: { currentUser.email }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ this.handleClickOpenClose } >
              Close
          </Button>
          <Button disabled color="secondary">
              Edit
          </Button>
        </DialogActions>
      </Dialog></>
    )
  }
}
// const mapStateToProps = ({ userReducer }) => ({
//   currentUser: userReducer.currentUser,
// })
const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser }, dispatch)

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(Navigation))