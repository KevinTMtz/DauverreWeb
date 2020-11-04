import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createReport } from '../../firebase/db/reports';

import PageTitle from '../PageTitle';
import ReportForm from './ReportForm';

const CreateReport: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  const history = useHistory();
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
        console.log('Report created');
        history.push('/residents/' + residentID);
      }
    });
  };
  return (
    <div>
      <PageTitle message={'Crear reporte'} />
      <ReportForm
        report={newReport}
        onSubmit={onSubmit}
        cancelOperation={() => {
          history.push('/residents/' + residentID);
        }}
        setReportState={setNewReport}
        buttonMessage={'Crear reporte'}
      />
    </div>
  );
};

export default CreateReport;
