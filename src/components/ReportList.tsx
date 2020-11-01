import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReports } from '../firebase/db/reports';

const ReportsList: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  const [reports, setReports] = useState<Report[]>([]);
  useEffect(() => {
    getReports(residentID).then((repid) => setReports(repid));
  }, [residentID]);
  return (
    <div>
      <h1>Reports List Page from</h1>
      {reports.map((r) => (
        <div key={r.reportID}>
          <h2>{r.reportID}</h2>
          <h2>
            Fecha:{' '}
            {new Date(r.date).toString().substr(4, 6) +
              ', ' +
              new Date(r.date).getFullYear().toString()}
          </h2>
          <h5>Mood: {r.mood}</h5>
          <h5>Health: {r.health}</h5>
          <h5>Sad: {r.sad.toString()}</h5>
          <h5>Angry: {r.angry.toString()}</h5>
          <h5>Rested: {r.rested.toString()}</h5>
          <h5>Well Fed: {r.wellFed.toString()}</h5>
          <h5>Lonely: {r.lonely.toString()}</h5>
          <h5>Comments: {r.comments}</h5>
        </div>
      ))}
    </div>
  );
};

export default ReportsList;
