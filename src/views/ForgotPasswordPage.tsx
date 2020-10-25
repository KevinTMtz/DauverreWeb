import React, { useState } from 'react';
import { Link } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import CenteredLoginForm from '../components/CenteredLoginForm';

const styledLink = css({
  padding: '16px',
  textDecoration: 'inherit',
});

const styledTitle = css({
  textAlign: 'center',
});

const ForgotPasswordPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Recuperando contraseña de:', username);
  };
  return (
    <div>
      <h1 css={styledTitle}>Forgot Password Page</h1>
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
        <Link to="/login" css={styledLink}>
          Cancelar
        </Link>
      </CenteredLoginForm>
    </div>
  );
};

export default ForgotPasswordPage;
