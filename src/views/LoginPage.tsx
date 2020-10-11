import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import CenteredLoginForm from '../components/CenteredLoginForm';

const StyledLink = styled(Link)`
  padding: 10px;
`;

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Iniciando sesión con datos:', username, password);
  };
  return (
    <div>
      <h1>Login Page</h1>
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Inicia sesión
        </Button>
        <StyledLink to="/forgotpass">¿Olvidaste tu contraseña?</StyledLink>
      </CenteredLoginForm>
    </div>
  );
};

export default LoginPage;