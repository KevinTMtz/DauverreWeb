import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';

const EditReportPage: React.FC = () => {
  const { residentID, reportID } = useParams<ReportParams>();
  return (
    <div>
      <PageTitle message={'Editar reporte'} />
      <h3>
        Editing report "{reportID}" for resident "{residentID}"
      </h3>
    </div>
  );
};

export default EditReportPage;
