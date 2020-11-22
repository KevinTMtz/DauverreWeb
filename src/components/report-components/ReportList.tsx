import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { isPsyOrAdmin } from '../../firebase/auth';
import { getReports } from '../../firebase/db/reports';
import ReportListCell from './ReportListCell';

const addButtonStyle = css({
  width: '70%',
  border: 'none',
  borderRadius: '10px',
  height: '40px',
  backgroundColor: '#74b9ff',
  fontSize: '18px',
  marginBottom: '10px',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.01)',
  },
  '@media (max-width: 600px)': {
    width: '90%',
  },
});

const reportsDiv = css({
  width: '70%',
  transitionDuration: '0.3s',
  '@media (max-width: 600px)': {
    width: '90%',
  },
});

interface ReportsListProps {
  userAcc: UserAcc | undefined;
}

const ReportsList: React.FC<ReportsListProps> = ({ userAcc }) => {
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
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Últimos reportes</h1>
      {isPsyOrAdmin(userAcc) && (
        <button
          css={addButtonStyle}
          onClick={() => history.push(`/residents/${residentID}/newreport`)}
        >
          Crear reporte
        </button>
      )}
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
        <div css={reportsDiv}>
          {reports.map((r) => (
            <ReportListCell key={r.reportID} {...r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsList;
