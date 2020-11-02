import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import ResidentForm from '../../components/resident-components/ResidentForm'
import { getResident, updateResident } from '../../firebase/db/residents'


const EditResidentPage: React.FC = () => {
  const history = useHistory();
  const { residentID } = useParams<ResidentParams>();

  const [resident, setResident] = useState<Resident>({
    firstName: '',
    lastName: '',
    gender: '',
    isVisible: true,
    birthDate: new Date(),
    telephone: '',
    residentID: residentID,
  });

  useEffect(() => {
    getResident(residentID).then((value) => {
      if ((value as NotFoundError).notFound) {
        history.push('/residents');
      } else {
        setResident(value as Resident);
      }
    });
  }, [residentID, history]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateResident({ ...resident, residentID}).then((value) => {
      if ((value as SuccessMessage).success) {
        history.push('/residents');
      }
    });
  };

  return (
    <div>
      <PageTitle message={'Editar residente'} />
      <ResidentForm
        resident={resident}
        onSubmit={onSubmit}
        cancelOperation={() => {
          history.push('/residents');
        }}
        setResidentState={setResident}
        buttonMessage={'Guardar cambios'}
      />
    </div>
  );
};

export default EditResidentPage;
