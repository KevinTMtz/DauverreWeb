import React, { useState } from 'react';

/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import CircularProgressIndicator from './CircularProgressIndicator';
import { resetPasswordFromAccount } from '../firebase/functions';
import joinStringsAsList from '../utils/joinStringsAsList';

const divStyle = css({
  margin: '0 20px 20px 20px',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'start',
  },
});

const h1Style = css({
  margin: 'auto 0px',
  fontSize: '22px',
  maxWidth: 'calc(100vw - 360px)',
  '@media (max-width: 600px)': {
    fontSize: '20px',
    maxWidth: '100%',
  },
});

const pStyle = css({
  '@media (max-width: 600px)': {
    marginBottom: '0',
  },
});

interface UserDisplayProps extends AccountListing {}

const UserDisplay: React.FC<UserDisplayProps> = ({
  accountID,
  telephone,
  residents,
}) => {
  const [formState, setFormState] = useState<FormState>({ state: 'waiting' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedResidentID, setSelectedResidentID] = useState(
    residents[0].residentID,
  );

  const onSubmit = () => {
    setDialogOpen(true);
    if (residents.length === 1) resetPassword();
  };

  const resetPassword = async () => {
    setFormState({ state: 'loading' });
    const resp = await resetPasswordFromAccount(accountID, selectedResidentID);
    if (resp.state === 'success') {
      setFormState({
        state: 'correct',
        message: 'La cuenta se ha actualizado correctamente',
      });
    }
  };

  const exit = () => {
    setDialogOpen(false);
    setTimeout(() => setFormState({ state: 'waiting' }), 500);
  };

  return (
    <Card css={divStyle}>
      <CardContent>
        <h1 css={h1Style}>{joinStringsAsList(residents.map((r) => r.name))}</h1>
        <p css={pStyle}>Teléfono {telephone}</p>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Reiniciar constraseña
        </Button>
      </CardActions>
      <Dialog disableBackdropClick disableEscapeKeyDown open={dialogOpen}>
        {formState.state === 'waiting' && (
          <React.Fragment>
            <DialogTitle>
              La cuenta a la que quiere reiniciar la contraseña está asociada a
              más de un residente
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Seleccione a qué residente seleccionar para sobreescribir la
                contraseña con su fecha de nacimiento
              </DialogContentText>
              <FormControl fullWidth>
                <InputLabel id="select-login-account">
                  Selecciona la cuenta
                </InputLabel>
                <Select
                  required
                  autoFocus
                  style={{ minWidth: '220px' }}
                  labelId="select-login-account"
                  value={selectedResidentID}
                  onChange={(e) =>
                    setSelectedResidentID(e.target.value as string)
                  }
                >
                  {residents.map(({ name, residentID }) => (
                    <MenuItem key={residentID} value={residentID}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={exit} color="primary">
                Cancelar
              </Button>
              <Button onClick={resetPassword} color="primary">
                Sobreescribir
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
        {formState.state === 'loading' && (
          <DialogContent>
            <CircularProgressIndicator />
          </DialogContent>
        )}
        {formState.state === 'correct' && (
          <React.Fragment>
            <DialogContent>
              <DialogContentText>
                La contraseña fue cambiada correctamente
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={exit} color="primary">
                Okay
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
        {formState.state === 'server error' && (
          <React.Fragment>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>{formState.message}</DialogContent>
            <DialogActions>
              <Button onClick={exit} color="primary">
                Ok
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </Card>
  );
};

export default UserDisplay;
