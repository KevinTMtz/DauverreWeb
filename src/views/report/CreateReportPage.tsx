import React from 'react';
import { useParams } from 'react-router-dom';

const CreateReportPage: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  return (
    <div>
      <h1>Create Report Page</h1>
      <h3>Creating report for resident "{residentID}"</h3>
    </div>
  );
};

export default CreateReportPage;
