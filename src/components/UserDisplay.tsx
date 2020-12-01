import React, { useState } from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';

import CircularProgressIndicator from './CircularProgressIndicator';
import CustomDialog from './CustomDialog';
import {
  changeTelephone,
  resetPasswordFromAccount,
} from '../firebase/functions';
import joinStringsAsList from '../utils/joinStringsAsList';
import cleanPhone from '../utils/cleanPhone';

const divStyle = css({
  marginBottom: '20px',
  padding: '10px 10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'start',
    '& > div': { paddingBottom: '8px' },
  },
});

const h1Style = css({
  margin: 'auto 0px',
  fontSize: '22px',
  maxWidth: 'calc(100vw - 370px)',
  '@media (max-width: 600px)': {
    fontSize: '20px',
    maxWidth: '100%',
  },
});

const pStyle = css({
  '@media (max-width: 600px)': {
    margin: '4px 0 0 0',
  },
});

const buttonContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  minWidth: '238px',
  justifyContent: 'space-between',
  '@media (max-width: 600px)': {
    width: 'calc(100% - 16px)',
    height: 'initial',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  '& > button': { margin: '4px 8px' },
});

const buttonStyle = css({
  width: '100%',
});

interface UserDisplayProps extends AccountListing {
  updateOwnPhone: (telephone: string) => void;
}

const UserDisplay: React.FC<UserDisplayProps> = ({
  accountID,
  telephone,
  updateOwnPhone,
  residents,
}) => {
  const [formState, setFormState] = useState<FormState>({ state: 'closed' });

  const [telephoneInp, setTelephoneInp] = useState<string>('');
  const changePhoneNumber = async () => {
    setFormState({ state: 'loading' });
    const resp = await changeTelephone(accountID, cleanPhone(telephoneInp));
    switch (resp.state) {
      case 'success':
        setFormState({
          state: 'correct',
          message: 'El teléfono fue actualizado correctamente',
        });
        updateOwnPhone(cleanPhone(telephoneInp));
        break;
      case 'firebase error':
        setFormState({
          state: 'server error',
          message: 'El servidor tiene problemas con su solicitud',
        });
        break;
      case 'validation errors':
        setFormState({
          state: 'server error',
          message: resp.errors.join('\n'),
        });
    }
  };
  const dialogChangeTelephone =
    formState.state === 'waiting' && formState.substate === 'changeTelephone';

  const [selectedResidentID, setSelectedResidentID] = useState(
    residents[0].residentID,
  );
  const resetPassword = async () => {
    setFormState({ state: 'loading' });
    const resp = await resetPasswordFromAccount(accountID, selectedResidentID);
    if (resp.state === 'success') {
      setFormState({
        state: 'correct',
        message: 'La contraseña fue cambiada correctamente',
      });
    } else {
      setFormState({
        state: 'server error',
        message: 'El servidor tiene problemas con su solicitud',
      });
    }
  };
  const dialogResetPassword =
    formState.state === 'waiting' && formState.substate === 'resetPassword';

  const exit = () => {
    setTelephoneInp('');
    setFormState({ state: 'closed' });
  };

  return (
    <Card
      css={divStyle}
      style={{
        boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
        borderRadius: '10px',
      }}
    >
      <CardContent>
        <h1 css={h1Style}>{joinStringsAsList(residents.map((r) => r.name))}</h1>
        <p css={pStyle}>Teléfono {telephone}</p>
      </CardContent>
      <CardActions css={buttonContainerStyle}>
        <Button
          css={buttonStyle}
          variant="contained"
          onClick={() =>
            setFormState({ state: 'waiting', substate: 'changeTelephone' })
          }
        >
          Cambiar teléfono
        </Button>
        <Button
          css={buttonStyle}
          variant="contained"
          onClick={() => {
            if (residents.length === 1) resetPassword();
            else setFormState({ state: 'waiting', substate: 'resetPassword' });
          }}
        >
          Reiniciar constraseña
        </Button>
      </CardActions>
      <CustomDialog
        open={formState.state !== 'closed' && formState.state !== 'loading'}
      >
        {dialogResetPassword && (
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
              <Button autoFocus onClick={exit}>
                Cancelar
              </Button>
              <Button onClick={resetPassword}>Sobreescribir</Button>
            </DialogActions>
          </React.Fragment>
        )}
        {dialogChangeTelephone && (
          <form onSubmit={changePhoneNumber}>
            <DialogTitle>Escriba el nuevo número de teléfono</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  fullWidth
                  id="telephone"
                  label="Número de teléfono"
                  name="telephone"
                  autoComplete="telephone"
                  autoFocus
                  required
                  inputProps={{ pattern: '(\\d\\s?-?){10}' }}
                  value={telephoneInp}
                  onChange={(event) => setTelephoneInp(event.target.value)}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={exit}>
                Cancelar
              </Button>
              <Button type="submit">Actualizar</Button>
            </DialogActions>
          </form>
        )}
        {formState.state === 'correct' && (
          <React.Fragment>
            <DialogContent>
              <DialogContentText>{formState.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={exit}>
                Ok
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
        {formState.state === 'server error' && (
          <React.Fragment>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>{formState.message}</DialogContent>
            <DialogActions>
              <Button onClick={exit}>Ok</Button>
            </DialogActions>
          </React.Fragment>
        )}
      </CustomDialog>

      <Backdrop style={{ zIndex: 1000 }} open={formState.state === 'loading'}>
        <CircularProgressIndicator />
      </Backdrop>
    </Card>
  );
};

export default UserDisplay;
