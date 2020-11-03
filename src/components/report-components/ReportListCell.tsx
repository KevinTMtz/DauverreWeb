import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import HealthEmoji from './HealthEmoji';
import MoodEmoji from './MoodEmoji';
import StateEmoji from './StateEmoji';

const cellStyle = css({
  padding: '16px',
  margin: '10px auto',
  borderRadius: '10px',
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
  width: 'calc(90% - 32px)',
  '@media (max-width: 600px)': {
    width: 'calc(90% - 32px)',
  },
});
const info = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const healthInfo = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '20px 0',
  padding: '15px 30px',
  borderRadius: '10px',
  border: '1px solid black',
  h5: {
    margin: '5px 0 15px 0',
  },
});

const stateInfo = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

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
  <div css={cellStyle} id={'rep-' + reportID}>
    <h2 style={{ textAlign: 'center' }}>
      Reporte del {format(date, 'PPPP', { locale: es })}
    </h2>
    <div css={info}>
      <div>
        <div css={healthInfo}>
          <h5>Estado de ánimo:</h5>
          <MoodEmoji index={mood} height="50px" />
        </div>
        <div css={healthInfo}>
          <h5>Estado de salud:</h5>
          <HealthEmoji index={health} height="50px" />
        </div>
      </div>
      <div style={{ width: '40%' }}>
        <div css={stateInfo}>
          <StateEmoji index={1} height="30px" />
          <h5>¿Se sintió triste?:</h5>
          <h5 style={sad ? { color: 'green' } : { color: 'red' }}>
            {sad ? '✔' : '✖'}
          </h5>
        </div>
        <div css={stateInfo}>
          <StateEmoji index={2} height="30px" />
          <h5>¿Se sintió enojado?:</h5>
          <h5 style={angry ? { color: 'green' } : { color: 'red' }}>
            {angry ? '✔' : '✖'}
          </h5>
        </div>
        <div css={stateInfo}>
          <StateEmoji index={3} height="30px" />
          <h5>¿Descansó bien?:</h5>
          <h5 style={rested ? { color: 'green' } : { color: 'red' }}>
            {rested ? '✔' : '✖'}
          </h5>
        </div>
        <div css={stateInfo}>
          <StateEmoji index={4} height="30px" />
          <h5>¿Se alimentó bien?:</h5>
          <h5 style={wellFed ? { color: 'green' } : { color: 'red' }}>
            {wellFed ? '✔' : '✖'}
          </h5>
        </div>
        <div css={stateInfo}>
          <StateEmoji index={5} height="30px" />
          <h5>¿Se sintió solo?:</h5>
          <h5 style={lonely ? { color: 'green' } : { color: 'red' }}>
            {lonely ? '✔' : '✖'}
          </h5>
        </div>
      </div>
    </div>
    {comments && (
      <h5 style={{ textAlign: 'justify' }}>
        Comentarios:{' '}
        <span style={{ fontWeight: 'normal', marginLeft: '15px' }}>
          {comments}
        </span>
      </h5>
    )}
  </div>
);

export default ReportListCell;
