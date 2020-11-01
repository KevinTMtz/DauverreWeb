import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../components/PageTitle';

const CreateReport: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  return (
    <div>
      <PageTitle message={'Crear reporte'} />
      <h3>Creating report for resident "{residentID}"</h3>
    </div>
  );
};

export default CreateReport;
