import React, { useEffect, useState } from 'react';
import 'date-fns';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import { listAccounts } from '../../firebase/functions';
import CircularProgressIndicator from '../CircularProgressIndicator';

const styledForm = css({
  width: '70%',
  margin: 'auto',
  fontSize: '18px',
  fontWeight: 'bold',
  transitionDuration: '0.3s',
  '@media (max-width: 600px)': {
    width: '90%',
  },
});

interface ResidentFormProps {
  resident: ResidentData;
  setResidentState: React.Dispatch<React.SetStateAction<ResidentData>>;
  loginMethod: ResidentFamLoginMethod;
  setLoginMethod: React.Dispatch<React.SetStateAction<ResidentFamLoginMethod>>;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  submit: (shouldUpdatePassword: boolean) => void;
  exit: () => void;
  buttonMessage: string;
}

const ResidentForm: React.FC<ResidentFormProps> = ({
  resident,
  setResidentState,
  loginMethod,
  setLoginMethod,
  formState,
  setFormState,
  submit,
  exit,
  buttonMessage,
}) => {
  const [accountListings, setAccountListings] = useState<AccountListing[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    listAccounts().then((res) => {
      if (res.state === 'success') setAccountListings(res.accounts);
    });
  }, []);
  return (
    <form
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        setFormState({ state: 'waiting' });
        setDialogOpen(true);
      }}
      css={styledForm}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="Nombre(s)"
        name="firstName"
        autoComplete="firstName"
        autoFocus
        value={resident.firstName}
        onChange={(event) =>
          setResidentState({ ...resident, firstName: event.target.value })
        }
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Apellido"
        name="lastName"
        autoComplete="lastName"
        autoFocus
        value={resident.lastName}
        onChange={(event) =>
          setResidentState({ ...resident, lastName: event.target.value })
        }
      />
      <p>Fecha de nacimiento</p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Fecha"
          fullWidth
          value={resident.birthDate}
          onChange={(event) =>
            setResidentState({
              ...resident,
              birthDate: new Date(event!.valueOf()),
            })
          }
          KeyboardButtonProps={{ 'aria-label': 'change date' }}
        />
      </MuiPickersUtilsProvider>
      <FormControl
        variant="outlined"
        margin="normal"
        required
        fullWidth
        component="fieldset"
      >
        <FormLabel component="legend">Sexo</FormLabel>
        <RadioGroup
          value={resident.gender}
          aria-label="gender"
          name="gender"
          row
        >
          <FormControlLabel
            control={<Radio />}
            label="Masculino"
            value="Hombre"
            onChange={() => setResidentState({ ...resident, gender: 'Hombre' })}
          />
          <FormControlLabel
            control={<Radio />}
            label="Femenino"
            value="Mujer"
            onChange={() => setResidentState({ ...resident, gender: 'Mujer' })}
          />
          <FormControlLabel
            control={<Radio />}
            label="Otro"
            value="Otro"
            onChange={() => setResidentState({ ...resident, gender: 'Otro' })}
          />
        </RadioGroup>
      </FormControl>
      <AppBar position="static">
        <Tabs
          value={loginMethod.loginMethodIdx}
          onChange={(_, newTabIdx) => {
            if (newTabIdx === 0)
              setLoginMethod({ loginMethodIdx: 0, telephone: '' });
            else setLoginMethod({ loginMethodIdx: 1, accountID: '' });
          }}
          variant="fullWidth"
          centered
        >
          <Tab label="Crear una cuenta de familiar nueva" />
          <Tab label="Añadir residente a una cuenta existente" />
        </Tabs>
      </AppBar>
      {loginMethod.loginMethodIdx === 0 && (
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="telephone"
          label="Número de teléfono"
          name="telephone"
          autoComplete="telephone"
          autoFocus
          required
          inputProps={{ pattern: '(\\d\\s?-?){10}' }}
          value={loginMethod.telephone}
          onChange={(event) =>
            setLoginMethod({ ...loginMethod, telephone: event.target.value })
          }
        />
      )}
      {loginMethod.loginMethodIdx === 1 && (
        <FormControl fullWidth>
          <InputLabel id="select-login-account">
            Selecciona la cuenta
          </InputLabel>
          <Select
            required
            autoFocus
            labelId="select-login-account"
            value={loginMethod.accountID}
            onChange={(e) =>
              setLoginMethod({
                ...loginMethod,
                accountID: e.target.value as string,
              })
            }
          >
            {accountListings.map(({ accountID, name, telephone }) => (
              <MenuItem key={accountID} value={accountID}>
                {telephone} - {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '32px' }}
      >
        {buttonMessage}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        style={{ marginTop: '20px' }}
        onClick={exit}
      >
        Cancelar
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={dialogOpen}
        style={{ overflow: 'hidden' }}
      >
        {formState.state === 'waiting' && (
          <React.Fragment>
            <DialogTitle>
              ¿Quiere sobreescribir la contraseña de la cuenta a la que va a
              asignar el residente con su cumpleaños?
            </DialogTitle>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => setDialogOpen(false)}
                color="primary"
              >
                Cancelar
              </Button>
              <Button onClick={() => submit(false)} color="primary">
                Dejar contraseña como está
              </Button>
              <Button onClick={() => submit(true)} color="primary">
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
            <DialogTitle>{formState.message}</DialogTitle>
            <DialogActions>
              <Button onClick={exit} color="primary">
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
              <Button onClick={() => setDialogOpen(false)} color="primary">
                Ok
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </form>
  );
};

export default ResidentForm;
