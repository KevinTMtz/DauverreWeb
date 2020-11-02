import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PageTitle from '../PageTitle';
import { getReport } from '../../firebase/db/reports';

const ViewReport: React.FC = () => {
  const history = useHistory();
  const { residentID, reportID } = useParams<ReportParams>();
  const [report, setReport] = useState<Report>();
  useEffect(() => {
    getReport(residentID, reportID).then((repid) => {
      if ((repid as NotFoundError).notFound) {
        history.push(`/residents/${residentID}`);
      } else {
        setReport(repid as Report);
      }
    });
  }, [history, residentID, reportID]);
  return (
    <div>
      <PageTitle message={'Reporte'} />
      <h3>
        Viewing report "{reportID}" for resident "{residentID}"
      </h3>
      {report ? <h3>{report.comments}</h3> : <h3>Cargando...</h3>}
    </div>
  );
};

export default ViewReport;
