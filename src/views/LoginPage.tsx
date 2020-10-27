import React, { useState } from 'react';
import { Link } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import CenteredLoginForm from '../components/CenteredLoginForm';
import PageTitle from '../components/PageTitle';

const styledLink = css({
  padding: '16px',
  textDecoration: 'inherit',
});

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Iniciando sesión con datos:', username, password);
  };
  return (
    <div>
      <PageTitle message={'Iniciar sesión'} />
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
        <Link to="/forgotpass" css={styledLink}>
          ¿Olvidaste tu contraseña?
        </Link>
      </CenteredLoginForm>
    </div>
  );
};

export default LoginPage;
