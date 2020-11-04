import React, { useState } from 'react';

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
  borderRadius: '10px',
  border: '2px solid black',
  display:'flex',
  maxWidth: '50vw',
  '@media (max-width: 600px)': {
    maxWidth: '80vw',
  },
  justifyContent:'space-between',
});



const h1Style = css({
  margin: '5px 0px',
});


interface UserDisplayProps {
  resident: Resident

}
const UserDisplay: React.FC <UserDisplayProps>= ({ resident }) => {

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const resID = resident.residentID;


  const onSubmit = () => {
    const resetPasswordResidentFamAcc = functions.httpsCallable('resetPasswordResidentFamAcc');
    //const resetPasswordResidentFamAcc = functions.httpsCallable('/api/users/reset/${resID}');
    setOpen(true)
    resetPasswordResidentFamAcc({uid:resID}).then((value) =>{
      if ((value as unknown as SuccessMessage).success) {
        setOpen(true);
      }
    });
  };
  return(
    <div css={divStyle}>

      <h1 css={h1Style}>
        {resident.firstName} {resident.lastName}
      </h1>
      <Button type="submit" variant="contained" color="primary" onClick={() =>  onSubmit() }>
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
