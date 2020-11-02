import React from 'react';
import 'date-fns';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const styledForm = css({
  width: '80%',
  margin: 'auto',
  '@media (max-width: 600px)': {
    width: '90%',
  },
  fontSize: '18px',
  fontWeight: 'bold',
});

const ResidentForm: React.FC<any> = (props) => {
  return (
    <form autoComplete="off" onSubmit={props.onSubmit} css={styledForm}>
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
        value={props.resident.firstName}
        onChange={(event) =>
          props.setResidentState({ ...props.resident, firstName: event.target.value })
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
        value={props.resident.lastName}
        onChange={(event) =>
          props.setResidentState({ ...props.resident, lastName: event.target.value })
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
          value={props.resident.birthDate}
          onChange={(event) =>
            props.setResidentState({
              ...props.resident,
              birthDate: new Date(event!.valueOf()),
            })
          }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
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
        <RadioGroup aria-label="gender" name="gender" row>
          <FormControlLabel
            control={<Radio />}
            label="Masculino"
            value="male"
            // onChange={(event) => 
            //   props.setResidentState({ ...props.resident, gender: event.target.checked})
            // }
          />
          <FormControlLabel
            control={<Radio />}
            label="Femenino"
            value="female"
          />
          <FormControlLabel
            control={<Radio />}
            label="Otro"
            value="other"
          />
        </RadioGroup>
      </FormControl>
      <TextField 
        variant="outlined"
        margin="normal"
        fullWidth
        id="telephone"
        label="Número de teléfono"
        name="telephone"
        autoComplete="telephone"
        autoFocus
        value={props.resident.telephone}
        onChange={(event) =>
          props.setResidentState({ ...props.resident, telephone: event.target.value })
        }
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
          {props.buttonMessage}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        style={{ marginTop: '20px' }}
        onClick={props.cancelOperation}
      >
        Cancelar
      </Button> 
    </form>
  );
};

export default ResidentForm;