import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';

const ViewReportPage: React.FC = () => {
  const { residentID, reportID } = useParams<ReportParams>();
  return (
    <div>
      <PageTitle message={'Reporte'} />
      <h3>
        Viewing report "{reportID}" for resident "{residentID}"
      </h3>
    </div>
  );
};

export default ViewReportPage;
