import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import ResidentForm from '../../components/resident-components/ResidentForm'
import { createResident } from '../../firebase/db/residents'

const RegisterResidentPage: React.FC = () => {
  const history = useHistory();
  const { residentID } = useParams<ResidentParams>();

  const [newResidentState, setNewResidentState] = useState<Resident>({
    firstName: '',
    lastName: '',
    gender: '',
    isVisible: true,
    birthDate: new Date(),
    telephone: '',
    residentID: residentID,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createResident(newResidentState).then((value) => {
      if ((value as SuccessMessage).success) {
        history.push('/residents');
      }
    });
  };

  return (
    <div>
      <PageTitle message={'Registrar residente'} />
      <ResidentForm
        resident={newResidentState}
        onSubmit={onSubmit}
        cancelOperation={() => {
          history.push('/residents');
        }}
        setResidentState={setNewResidentState}
        buttonMessage={'Registrar'}
      />
    </div> 
  );
}

export default RegisterResidentPage;
