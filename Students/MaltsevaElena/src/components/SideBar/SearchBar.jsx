import React from 'react'

// Styles, UI
import { AppBar, 
         InputBase, InputAdornment,
         Toolbar } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   grow: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
   },
   search: {
      borderBottom: '1px solid rgba(255, 255, 255, .2)'
   },
   inputSearch: {
      color: 'inherit',
      padding: theme.spacing(1, 0),
   },
}))

export default (props) => {
   const classes = useStyles()
   const { handleChange, inputValue } = props

   return (
      <AppBar position="static" className={ classes.grow }>
         <Toolbar className={ classes.search }>
            <InputBase aria-label="search" className={ classes.inputSearch }
               name="inputSearch"
               placeholder="Search..."
               onChange={ handleChange }
               value={ inputValue }
               startAdornment={
                  <InputAdornment 
                     position="start" 
                     children={ <Search /> }
                  />
               }
            />
         </Toolbar>
      </AppBar>
   )
}