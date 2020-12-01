import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
import Backdrop from '@material-ui/core/Backdrop';
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import esLocale from 'date-fns/locale/es';

import CircularProgressIndicator from '../CircularProgressIndicator';
import CustomDialog from '../CustomDialog';
import { listAccounts } from '../../firebase/functions';
import joinStringsAsList from '../../utils/joinStringsAsList';

const loginMethodDiv = css({
  width: '100%',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const birthDateGenderDiv = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '5%',
  '@media (max-width: 800px)': { gridTemplateColumns: '1fr' },
});

const styledForm = css({
  width: '70%',
  margin: 'auto',
  fontSize: '18px',
  fontWeight: 'bold',
  transitionDuration: '0.3s',
  '@media (max-width: 600px)': { width: '90%' },
});

interface ResidentFormProps {
  resident: ResidentData;
  setResidentState: React.Dispatch<React.SetStateAction<ResidentData>>;
  loginMethod: ResidentFamLoginMethod;
  setLoginMethod: React.Dispatch<React.SetStateAction<ResidentFamLoginMethod>>;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  submit: () => void;
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
        submit();
      }}
      css={styledForm}
    >
      <TextField
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
      <div css={birthDateGenderDiv}>
        <FormControl
          variant="outlined"
          margin="normal"
          required
          component="fieldset"
        >
          <FormLabel component="legend">Fecha de nacimiento</FormLabel>
          <LocalizationProvider dateAdapter={DateFnsAdapter} locale={esLocale}>
            <DatePicker
              disableFuture
              openTo="year"
              views={['year', 'month', 'date']}
              value={resident.birthDate}
              onChange={(date) =>
                setResidentState({ ...resident, birthDate: date || new Date() })
              }
              renderInput={(params) => (
                <TextField {...params} margin="normal" variant="standard" />
              )}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl
          variant="outlined"
          margin="normal"
          required
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
              onChange={() =>
                setResidentState({ ...resident, gender: 'Hombre' })
              }
            />
            <FormControlLabel
              control={<Radio />}
              label="Femenino"
              value="Mujer"
              onChange={() =>
                setResidentState({ ...resident, gender: 'Mujer' })
              }
            />
            <FormControlLabel
              control={<Radio />}
              label="Otro"
              value="Otro"
              onChange={() => setResidentState({ ...resident, gender: 'Otro' })}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <AppBar position="static">
        <Tabs
          value={loginMethod.loginMethodIdx}
          onChange={(_, newTabIdx) =>
            setLoginMethod(
              newTabIdx === 0
                ? { loginMethodIdx: 0, telephone: '' }
                : { loginMethodIdx: 1, accountID: '' },
            )
          }
          variant="fullWidth"
          centered
        >
          <Tab label="Crear una cuenta de familiar nueva" />
          <Tab label="Añadir residente a una cuenta existente" />
        </Tabs>
      </AppBar>
      <div css={loginMethodDiv}>
        {loginMethod.loginMethodIdx === 0 && (
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
            value={loginMethod.telephone}
            onChange={(event) =>
              setLoginMethod({ ...loginMethod, telephone: event.target.value })
            }
          />
        )}
        {loginMethod.loginMethodIdx === 1 && accountListings.length === 0 && (
          <CircularProgressIndicator size="50px" margin="0" />
        )}
        {loginMethod.loginMethodIdx === 1 && accountListings.length > 0 && (
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
              {accountListings.map(({ accountID, residents, telephone }) => (
                <MenuItem key={accountID} value={accountID}>
                  {`${telephone} - `}
                  {joinStringsAsList(residents.map((r) => r.name))}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <Button
        type="submit"
        variant="contained"
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

      <CustomDialog
        open={formState.state !== 'closed' && formState.state !== 'loading'}
      >
        {formState.state === 'correct' && (
          <React.Fragment>
            <DialogTitle>{formState.message}</DialogTitle>
            <DialogActions>
              <Button onClick={exit}>Ok</Button>
            </DialogActions>
          </React.Fragment>
        )}
        {formState.state === 'server error' && (
          <React.Fragment>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>{formState.message}</DialogContent>
            <DialogActions>
              <Button onClick={() => setFormState({ state: 'closed' })}>
                Ok
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </CustomDialog>

      <Backdrop style={{ zIndex: 1000 }} open={formState.state === 'loading'}>
        <CircularProgressIndicator />
      </Backdrop>
    </form>
  );
};

export default ResidentForm;
