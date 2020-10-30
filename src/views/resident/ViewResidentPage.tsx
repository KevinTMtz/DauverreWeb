import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import ReportsRouter from '../report';

const ViewResidentPage: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  return (
    <div>
      <PageTitle message={'Residente'} />
      <h3>Viewing resident "{residentID}"</h3>
      <ReportsRouter />
    </div>
  );
};

export default ViewResidentPage;
