import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';

const EditResidentPage: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  return (
    <div>
      <PageTitle message={'Editar residente'} />
      <h3>Editing resident "{residentID}"</h3>
    </div>
  );
};

export default EditResidentPage;
