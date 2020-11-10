import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import ResidentForm from '../../components/resident-components/ResidentForm';
import { createResident } from '../../firebase/functions';

const RegisterResidentPage: React.FC = () => {
  const history = useHistory();

  const [resident, setResident] = useState<ResidentData>({
    firstName: '',
    lastName: '',
    gender: 'Hombre',
    isVisible: true,
    birthDate: new Date(),
  });
  const [loginMethod, setLoginMethod] = useState<ResidentFamLoginMethod>({
    loginMethodIdx: 0,
    telephone: '',
  });
  const [formState, setFormState] = useState<FormState>({ state: 'waiting' });

  const submit = (shouldUpdatePassword: boolean) => {
    setFormState({ state: 'loading' });
    createResident(resident, loginMethod, shouldUpdatePassword).then((res) => {
      if (res.state === 'success')
        setFormState({
          state: 'correct',
          message: 'El residente se ha creado con éxito',
        });
      else if (res.state === 'firebase error')
        setFormState({
          state: 'server error',
          message: 'El servidor tiene problemas con tu solicitud',
        });
      else
        setFormState({
          state: 'server error',
          message: res.errors.join('\n'),
        });
    });
  };

  return (
    <div>
      <PageTitle message={'Registrar residente'} />
      <ResidentForm
        resident={resident}
        setResidentState={setResident}
        loginMethod={loginMethod}
        setLoginMethod={setLoginMethod}
        formState={formState}
        setFormState={setFormState}
        submit={submit}
        exit={() => history.push('/residents')}
        buttonMessage="Registrar"
      />
    </div>
  );
};

export default RegisterResidentPage;
