import React from 'react';
import { useParams } from 'react-router-dom';
/*import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createReport } from '../../firebase/db/reports';*/

import PageTitle from '../PageTitle';

const CreateReport: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  /*const history = useHistory();
  const [newReport, setNewReport] = useState<ReportData>({
    date: new Date(),
    mood: 0,
    health: 0,
    sad: true,
    angry: true,
    rested: true,
    wellFed: true,
    lonely: true,
    comments: '',
  });
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createReport(residentID, newReport).then((value) => {
      if ((value as SuccessMessage).success) {
        history.push('/residents/:residentID');
      }
    });
  };*/
  return (
    <div>
      <PageTitle message={'Crear reporte'} />
      <h3>Creating report for resident "{residentID}"</h3>
    </div>
  );
};

export default CreateReport;
