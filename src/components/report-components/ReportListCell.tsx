import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import HealthEmoji from './HealthEmoji';
import MoodEmoji from './MoodEmoji';

interface ReportListCellProps extends Report {}

const ReportListCell: React.FC<ReportListCellProps> = ({
  angry,
  comments,
  date,
  health,
  lonely,
  mood,
  reportID,
  rested,
  sad,
  wellFed,
}) => (
  <div>
    <h2>Reporte del {format(date, 'PPPP', { locale: es })}</h2>
    <p>id {reportID}</p>
    <h5>Estado de ánimo:</h5>
    <MoodEmoji index={mood} height="50px" />
    <h5>Estado de salud:</h5>
    <HealthEmoji index={health} height="50px" />
    <h5>¿Se sintió triste?: {sad ? '✔' : '✖'}</h5>
    <h5>¿Se sintió enojado?: {angry ? '✔' : '✖'}</h5>
    <h5>¿Descansó bien?: {rested ? '✔' : '✖'}</h5>
    <h5>¿Se alimentó bien?: {wellFed ? '✔' : '✖'}</h5>
    <h5>¿Se sintió solo?: {lonely ? '✔' : '✖'}</h5>
    {comments && <h5>Comentarios: {comments}</h5>}
  </div>
);

export default ReportListCell;
