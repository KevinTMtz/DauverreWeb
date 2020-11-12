import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import ResidentForm from '../../components/resident-components/ResidentForm';
import { getResident } from '../../firebase/db/residents';
import { updateResident } from '../../firebase/functions';
import cleanPhone from '../../utils/cleanPhone';

const EditResidentPage: React.FC = () => {
  const history = useHistory();
  const { residentID } = useParams<ResidentParams>();

  const [resident, setResident] = useState<ResidentData>({
    firstName: '',
    lastName: '',
    gender: '',
    isVisible: true,
    birthDate: new Date(),
  });
  const [loginMethod, setLoginMethod] = useState<ResidentFamLoginMethod>({
    loginMethodIdx: 0,
    telephone: '',
  });
  const [formState, setFormState] = useState<FormState>({ state: 'closed' });

  useEffect(() => {
    getResident(residentID).then((value) => {
      if (value.state === 'not found') {
        history.push('/residents');
      } else {
        setResident(value.resident);
        setLoginMethod({
          loginMethodIdx: 1,
          accountID: value.account.accountID,
        });
      }
    });
  }, [residentID, history]);

  const submit = () => {
    setFormState({ state: 'loading' });
    if (loginMethod.loginMethodIdx === 0)
      loginMethod.telephone = cleanPhone(loginMethod.telephone);
    updateResident(resident, loginMethod).then((res) => {
      if (res.state === 'success')
        setFormState({
          state: 'correct',
          message: 'El residente se ha actualizado con éxito',
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
      <PageTitle message={'Editar residente'} />
      <ResidentForm
        resident={resident}
        setResidentState={setResident}
        loginMethod={loginMethod}
        setLoginMethod={setLoginMethod}
        formState={formState}
        setFormState={setFormState}
        submit={submit}
        exit={() => history.push('/residents')}
        buttonMessage="Guardar cambios"
      />
    </div>
  );
};

export default EditResidentPage;
