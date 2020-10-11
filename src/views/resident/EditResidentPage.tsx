import React from 'react';
import { useParams } from 'react-router-dom';

const EditResidentPage: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  return (
    <div>
      <h1>Edit Resident Page</h1>
      <h3>Editing resident "{residentID}"</h3>
    </div>
  );
};

export default EditResidentPage;
