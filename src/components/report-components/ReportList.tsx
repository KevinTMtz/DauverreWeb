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
      {typeof reports === 'undefined' ? (
        <div style={{ display: 'flex', alignContent: 'center' }}>
          <CircularProgress
            style={{
              width: '100px',
              height: '100px',
              margin: ' 20vh auto',
              color: '#74b9ff',
            }}
          />
        </div>
      ) : reports.length === 0 ? (
        <h1 style={{ textAlign: 'center' }}>No hay reportes</h1>
      ) : (
        <div>
          <h1 style={{ textAlign: 'center' }}>Últimos reportes</h1>
          {reports.map((r) => (
            <ReportListCell key={r.reportID} {...r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsList;
