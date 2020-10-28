import React, {useState, MouseEvent} from 'react';
import Markdown from 'markdown-to-jsx';

import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
//import resetPasswordResidentFamAcc from '../../functions/src/functions/resetPasswordResidentFamAcc';
import {functions} from '../firebase/app'
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
//import { AnalyticsEvent } from 'firebase-functions/lib/providers/analytics';


const divStyle = css({
  padding: '10px',
  margin: '20px',

  display:'flex',
  maxWidth: '50vw',
  '@media (max-width: 600px)': {
    maxWidth: '80vw',
  },
  justifyContent:'space-between'
});



const h1Style = css({
  margin: '5px 0px',
});



//const UserDisplay: React.FC <{key: string, firstName: string, lastName: string}>= ({key, firstName, lastName}) => {
  const UserDisplay: React.FC <{  resident:any}>= ({ resident}) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const resID = resident.residentID;
    console.log(resID);


    const onSubmit = () => {
      const resetPasswordResidentFamAcc = functions.httpsCallable('resetPasswordResidentFamAcc');
      setOpen(true)
      /*resetPasswordResidentFamAcc({uid:resID}).then((value) =>{
        if ((value as unknown as SuccessMessage).success) {
          setOpen(true);
        }
      });*/
    };
    return(
        <div css={divStyle}>
          
              <h1 css={h1Style}>
                  {resident.firstName} {"  "}  {resident.lastName}
              </h1>
              <Button type="submit" variant="contained" color="primary" onClick={() => { onSubmit() }}>
                Cambiar
              </Button>
              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogContent>
                  <DialogContentText>
                    La contraseña fue cambiada correctamente
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="primary">
                    Okay
                  </Button>
                </DialogActions>
              </Dialog>
          </div>
    );
  }

export default UserDisplay;
