import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import CenteredLoginForm from '../components/CenteredLoginForm';

const ForgotPasswordPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Recuperando contraseña de:', username);
  };
  return (
    <div>
      <h1>Forgot Password Page</h1>
      <CenteredLoginForm noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Usuario"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Enviar solicitud
        </Button>
      </CenteredLoginForm>
    </div>
  );
};

export default ForgotPasswordPage;
