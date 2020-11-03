import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getReports } from '../../firebase/db/reports';
import ReportListCell from './ReportListCell';

const ReportsList: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  const [reports, setReports] = useState<Report[]>();
  useEffect(() => {
    getReports(residentID).then((repid) => {
      repid.reverse();
      setReports(repid);
    });
  }, [residentID]);
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Últimos reportes</h1>
      {typeof reports === 'undefined' ? (
        <h1 style={{ textAlign: 'center' }}>No hay reportes</h1>
      ) : reports.length === 0 ? (
        // No sé porque no está funcionando
        <CircularProgress style={{ margin: 'auto' }} />
      ) : (
        reports.map((r) => <ReportListCell key={r.reportID} {...r} />)
      )}
    </div>
  );
};

export default ReportsList;
