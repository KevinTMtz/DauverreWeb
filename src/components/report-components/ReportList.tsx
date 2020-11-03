import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getReports } from '../../firebase/db/reports';
import ReportListCell from './ReportListCell';

const ReportsList: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  const [reports, setReports] = useState<Report[]>([]);
  useEffect(() => {
    getReports(residentID).then((repid) => setReports(repid));
  }, [residentID]);
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Últimos reportes</h1>
      {reports.length === 0 ? (
        /*No sé como podría ponerle, porque quiero que esto aparezca 
        cuando no hay reportes pero aparecerá mintras carga la base de datos*/
        <h1 style={{ textAlign: 'center' }}>No hay reportes</h1>
      ) : (
        reports
          .slice(0)
          .reverse()
          .map((r) => <ReportListCell key={r.reportID} {...r} />)
      )}
    </div>
  );
};

export default ReportsList;
