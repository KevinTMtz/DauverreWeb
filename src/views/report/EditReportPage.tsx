import React from 'react';
import { useParams } from 'react-router-dom';

const EditReportPage: React.FC = () => {
  const { residentID, reportID } = useParams<ReportParams>();
  return (
    <div>
      <h1>Edit Report Page</h1>
      <h3>
        Editing report "{reportID}" for resident "{residentID}"
      </h3>
    </div>
  );
};

export default EditReportPage;
