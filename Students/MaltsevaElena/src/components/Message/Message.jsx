import React from 'react'

// Styles, UI
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex',
      flexDirection: 'column',
      color: theme.palette.text.primary,
   },
   bubble: {
      minWidth: '20%',
      maxWidth: '55%',
      borderRadius: theme.spacing(0.5),
      boxShadow: 1,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
   },
   currentUserMsg: {
      alignSelf: 'flex-end',
      backgroundColor: theme.palette.primary.main,
   },
   responderMsg: {
      alignSelf: 'flex-start',
      backgroundColor: theme.palette.primary.light,
   },
   dateTime: {
      color: theme.palette.text.secondary,
      textAlign: 'right',
   }
 }))

let msg = (props) => {

   const classes = useStyles()

   let { sender, text, created, currentUser } = props

   let boxView = (sender === currentUser._id ? classes.currentUserMsg : classes.responderMsg)

   let createdToDate = new Date(Date.parse(created))
   let msgDateTime = createdToDate.toLocaleString('ru', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
   })
   
   return (
      <Grid container wrap="nowrap" className={ classes.root }>
         <Box className={`${classes.bubble} ${boxView} `}>
            <Grid item >
               <Typography variant="body1"> { text } </Typography>
            </Grid>
            <Grid item className={ classes.dateTime }>
               <Typography variant="caption"> { msgDateTime } </Typography>
            </Grid>
         </Box>
      </Grid>
   )
}

export default msg