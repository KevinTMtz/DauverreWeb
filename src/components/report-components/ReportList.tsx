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
      <h1>Últimos reportes</h1>
      {reports.map((r) => (
        <ReportListCell key={r.reportID} {...r} />
      ))}
    </div>
  );
};

export default ReportsList;
