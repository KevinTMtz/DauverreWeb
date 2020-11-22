import React, { useState } from 'react';
import { Link } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import CenteredLoginForm from '../components/CenteredLoginForm';
import PageTitle from '../components/PageTitle';

const styledLink = css({
  padding: '8px',
  textDecoration: 'inherit',
  color: '#0984e3',
  marginTop: '12px',
});

const ForgotPasswordPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Recuperando contraseña de:', username);
  };
  return (
    <div>
      <PageTitle message={'Recuperar contraseña'} />
      <CenteredLoginForm noValidate onSubmit={onSubmit}>
        <TextField
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
        <Button
          style={{ marginTop: '32px' }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Enviar solicitud
        </Button>
        <Link to="/login" css={styledLink}>
          Regresar a inicio de sesión
        </Link>
      </CenteredLoginForm>
    </div>
  );
};

export default ForgotPasswordPage;
