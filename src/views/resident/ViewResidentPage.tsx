import React from 'react';
import { useParams } from 'react-router-dom';

const ViewResidentPage: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  return (
    <div>
      <h1>View Resident Page</h1>
      <h3>Viewing resident "{residentID}"</h3>
    </div>
  );
};

export default ViewResidentPage;
