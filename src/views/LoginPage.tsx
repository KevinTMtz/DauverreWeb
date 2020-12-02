import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import FormHelperText from '@material-ui/core/FormHelperText';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import CenteredLoginForm from '../components/CenteredLoginForm';
import CustomDialog from '../components/CustomDialog';
import PageTitle from '../components/PageTitle';
import { signInWithCredentials } from '../firebase/auth';

const styledErrorMsg = css({
  fontSize: '20px !important',
});

const ForgotPassBtn = styled(Button)({
  marginTop: '16px',
  color: '#0984e3',
  fontSize: '16px',
});

interface LoginPageProps {
  setUserAcc: React.Dispatch<React.SetStateAction<UserAcc | undefined>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUserAcc }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useHistory();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithCredentials(username, password, setUserAcc).then((result) => {
      if (result.state === 'success') history.push('/menu');
      else setError(result.error);
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
        <Button
          style={{ marginTop: '32px' }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Inicia sesión
        </Button>
        <ForgotPassBtn
          type="button"
          fullWidth
          onClick={() => setDialogOpen(true)}
        >
          ¿Olvidaste tu contraseña?
        </ForgotPassBtn>
      </CenteredLoginForm>
      <CustomDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La contraseña por defecto se genera compuesta por los 4 dígitos del
            año de nacimiento del residente, seguidos de dos dígitos del mes y
            finalmente dos dígitos del día.
          </DialogContentText>
          <DialogContentText>
            Por ejemplo, la fecha de nacimiento 12 de septiembre de 1955
            generaría la contraseña 19550912
          </DialogContentText>
          <DialogContentText>
            Si la cambiaste y quieres que tu contraseña sea reestablecida, ponte
            en contacto con nosotros.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Ok</Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
};

export default LoginPage;
