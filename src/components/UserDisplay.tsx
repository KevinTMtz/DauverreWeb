import React, { useState } from 'react';

/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { resetPasswordFromAccount } from '../firebase/functions';

const divStyle = css({
  padding: '10px 20px',
  margin: '20px auto',
  borderRadius: '10px',
  display: 'flex',
  backgroundColor: '#74b9ff',
  maxWidth: 'calc(70% - 40px)',
  '@media (max-width: 600px)': {
    maxWidth: 'calc(90% - 40px)',
  },
  justifyContent: 'space-between',
});

const h1Style = css({
  margin: 'auto 0px',
  fontSize: '20px',
  '@media (max-width: 600px)': {
    fontSize: '18px',
    width: 'calc(90% - 40px)',
  },
});

interface UserDisplayProps {
  resident: Resident;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ resident }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit = () => {
    setOpen(true);
    resetPasswordFromAccount(resident.residentID).then((value) => {
      if (value.success) {
        setOpen(true);
      }
    });
  };
  return (
    <div css={divStyle}>
      <h1 css={h1Style}>
        {resident.firstName} {resident.lastName}
      </h1>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => onSubmit()}
      >
        Reiniciar constraseña
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
};

export default UserDisplay;
