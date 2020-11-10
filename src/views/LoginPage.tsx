import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

import CenteredLoginForm from '../components/CenteredLoginForm';
import PageTitle from '../components/PageTitle';
import { signInWithCredentials } from '../firebase/auth';

const styledLink = css({
  padding: '16px',
  textDecoration: 'inherit',
});

const styledErrorMsg = css({
  fontSize: '20px !important',
});

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithCredentials(username, password).then((result) => {
      if (result.state === 'success') {
        history.push(result.url);
      } else {
        setError(result.error);
      }
    });
  };
  return (
    <div>
      <PageTitle message={'Iniciar sesión'} />
      <CenteredLoginForm noValidate onSubmit={onSubmit}>
        {error && (
          <FormHelperText error css={styledErrorMsg}>
            {error}
          </FormHelperText>
        )}
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
