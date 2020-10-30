import React from 'react';
import CenteredListResident from '../../components/resident-components/CenteredListResident';

import PageTitle from '../../components/PageTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';

const RegisterResidentPage: React.FC = () => {
  return (
  <div>
    <PageTitle message={'Registrar residente'} />
    <CenteredListResident >
    <TextField margin="normal" id="firstName" name="firstName" label="Nombre" />
    <TextField margin="normal" id="lastName" name="lastName" label="Apellido" />
    <TextField margin="normal" id="age" name="age" label="Edad" />
    <FormControl margin="normal" component="fieldset">
      <FormLabel component="legend">Sexo</FormLabel>
      <RadioGroup aria-label="gender" name="gender" row>
        <FormControlLabel value="female" control={<Radio />} label="Masculino" />
        <FormControlLabel value="male" control={<Radio />} label="Femenino" />
        <FormControlLabel value="other" control={<Radio />} label="Otro" />
      </RadioGroup>
    </FormControl>
    <Button type="submit" fullWidth variant="contained" color="primary">
        Registrar
    </Button>
    <Box marginTop="10px">
      <Button type="submit" color="primary">
        Cancelar
      </Button>
    </Box>    
    </CenteredListResident>
  </div>
);
}

export default RegisterResidentPage;
