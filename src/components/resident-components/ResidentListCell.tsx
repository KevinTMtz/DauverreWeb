import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useHistory } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const divStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  margin: '10px 0px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
  width: 'calc(90% - 32px)',
  '@media (max-width: 600px)': {
    width: 'calc(90% - 32px)',
  },
});

const h1Style = css({
  margin: '5px 0px',
});

const buttonsDiv = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
});

const editAndDeleteButton = css({
  width: '48%',
  height: '35px',
  borderRadius: '10px',
  fontSize: '18px',
  border: '2px solid #0984e3',
  color: 'white',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.01)',
  },
});

interface ResidentListCellProps extends Resident {
  deleteResident: () => void;
}

const ResidentListCell: React.FC<ResidentListCellProps> = ({
  residentID,
  firstName,
  lastName,
  gender,
  isVisible,
  birthDate,
  telephone,
  deleteResident,
}) => {
  const history = useHistory();
  return (
    <div css={divStyle}>
      <h1 css={h1Style}>
        {firstName} {lastName}{' '}
      </h1>
      <div>
        <h5>Sexo: {gender}</h5>
        <h5>Teléfono: {telephone}</h5>
        <h5>
          Fecha de nacimiento:{' '}
          {format(birthDate, 'PPPP', {
            locale: es,
          })}
        </h5>
        {isVisible || (
          <h5>Este residente no se encuentra actualmente en la institución</h5>
        )}
        <h5>ID: {residentID}</h5>
      </div>

      <div css={buttonsDiv}>
        <button
          css={editAndDeleteButton}
          style={{ backgroundColor: '#d63031' }}
          onClick={deleteResident}
        >
          Borrar
        </button>
        <button
          css={editAndDeleteButton}
          style={{ backgroundColor: '#00b894' }}
          onClick={() => history.push(`/residents/${residentID}/edit`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default ResidentListCell;
