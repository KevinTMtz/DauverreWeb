import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';

const ViewResidentPage: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  return (
    <div>
      <PageTitle message={'Residente'} />
      <h3>Viewing resident "{residentID}"</h3>
    </div>
  );
};

export default ViewResidentPage;
