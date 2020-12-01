import React, { useState } from 'react';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

import CenteredLoginForm from '../components/CenteredLoginForm';
import PageTitle from '../components/PageTitle';
import { updatePassword } from '../firebase/auth';

const styledLink = css({
  padding: '8px',
  textDecoration: 'inherit',
  color: '#0984e3',
  marginTop: '12px',
});

const styledMessage = css({
  fontSize: '20px !important',
  textAlign: 'center',
});

const NewPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState({
    p1: '',
    p2: '',
  });
  const [formState, setFormState] = useState<
    SuccessState | WaitingOnInputFormState | ValidationErrorsState
  >({ state: 'waiting' });

  const onChange = (pass: string, field: keyof typeof newPassword) => {
    const otherPass = field === 'p1' ? newPassword.p2 : newPassword.p1;
    if (pass !== otherPass)
      setFormState({
        state: 'validation errors',
        errors: ['Las contraseñas no coinciden'],
      });
    else setFormState({ state: 'waiting' });
    setNewPassword({ ...newPassword, [field]: pass });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword.p1 !== newPassword.p2) return;
    updatePassword(newPassword.p1).then((res) => {
      if (res.state === 'success') setFormState({ state: 'success' });
      else {
        const errors =
          res.state === 'validation errors'
            ? res.errors
            : ['Error en el servidor', res.code, res.message];
        setFormState({
          state: 'validation errors',
          errors,
        });
      }
    });
  };

  return (
    <div>
      <PageTitle message={'Cambiar contraseña'} />
      <CenteredLoginForm noValidate onSubmit={onSubmit}>
        {formState.state === 'validation errors' && (
          <FormHelperText error css={styledMessage}>
            {formState.errors.join('\n')}
          </FormHelperText>
        )}
        {formState.state === 'success' && (
          <FormHelperText css={styledMessage}>
            Su constraseña se ha actualizado correctamente
          </FormHelperText>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Ingrese su nueva contraseña"
          type="password"
          autoComplete="new-password"
          value={newPassword.p1}
          onChange={(event) => onChange(event.target.value, 'p1')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Ingrese su nueva contraseña de nuevo"
          type="password"
          autoComplete="new-password"
          value={newPassword.p2}
          onChange={(event) => onChange(event.target.value, 'p2')}
        />
        <Button
          style={{ marginTop: '32px' }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Cambiar contraseña
        </Button>
        <Link to="/menu" css={styledLink}>
          Regresar al menú
        </Link>
      </CenteredLoginForm>
    </div>
  );
};

export default NewPasswordPage;
