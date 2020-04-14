import React from 'react'

// Styles, UI
import { Button,
         Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

export default (props) => {
   const { width, open, handleClick, title, content, 
         cancelBtnTxt, submitBtnTxt, submitAction } = props

   return (
      <Dialog
         fullWidth
         maxWidth={ width || "xs" }
         open={ open } 
         onClose={ handleClick }
      >
         <DialogTitle children={ title }/>
         <DialogContent children={ content }/>
         <DialogActions>
            <Button 
               onClick={ handleClick } 
               className={ cancelBtnTxt }
               children={ cancelBtnTxt }
            />
            <Button disabled
               onClick={ submitAction } 
               color="secondary"
               children={ submitBtnTxt }
            />
         </DialogActions>
      </Dialog>
   )
}