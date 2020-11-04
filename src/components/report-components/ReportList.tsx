import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import { getReports } from '../../firebase/db/reports';
import ReportListCell from './ReportListCell';

const addButtonStyle = css({
  width: 'calc(90%)',
  border: '2px solid #0984e3',
  borderRadius: '10px',
  height: '40px',
  backgroundColor: '#74b9ff',
  fontSize: '18px',
  marginBottom: '10px',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.01)',
  },
});

const ReportsList: React.FC = () => {
  const history = useHistory();
  const { residentID } = useParams<ResidentParams>();
  const [reports, setReports] = useState<Report[]>();
  useEffect(() => {
    getReports(residentID).then((repid) => {
      repid.reverse();
      setReports(repid);
    });
  }, [residentID]);
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <button
        css={addButtonStyle}
        onClick={() => history.push(`/residents/${residentID}/newreport`)}
      >
        Crear reporte
      </button>
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
