import React from 'react';
import { useParams } from 'react-router-dom';

const ViewReportPage: React.FC = () => {
  const { residentID, reportID } = useParams<ReportParams>();
  return (
    <div>
      <h1>View Report Page</h1>
      <h3>
        Viewing report "{reportID}" for resident "{residentID}"
      </h3>
    </div>
  );
};

export default ViewReportPage;
