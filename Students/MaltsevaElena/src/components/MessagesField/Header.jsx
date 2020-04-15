import React from 'react'

// Styles, UI
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles(theme => ({
   appBar: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
      borderBottom: '1px solid rgba(255, 255, 255, .2)'
   },
   toolbar: {
      justifyContent: 'space-between',
   }
}))

export default (props) => {
   const classes = useStyles()
   const { responder } = props

   return (
      <AppBar position="static" className={ classes.appBar }>
         <Toolbar className={ classes.toolbar }>

            <div>
               <Typography variant="subtitle1" 
                  children={ responder.userName }
               />
               <Typography variant="caption" 
                  color={ responder.status === 'online' ? 'secondary' : 'textSecondary' }
                  children={ responder.status } 
               />
            </div>

            <div>
               <IconButton disabled aria-label="search" color="inherit"
                  children={ <SearchIcon /> }
               />
               <IconButton disabled aria-label="display more actions" edge="end" color="inherit"
                  children={ <MoreIcon /> }
               />
            </div>
            
         </Toolbar>
      </AppBar>
   )
}