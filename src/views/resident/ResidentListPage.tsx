import { useHistory, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import PageTitle from '../../components/PageTitle';
import ResidentListCell from '../../components/resident-components/ResidentListCell';

import { getResidents, deleteResident } from '../../firebase/db/residents';

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

const divStyle = css({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const ResidentListPage: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const [residents, setResidents] = useState<Resident[]>([]);
  useEffect(() => {
    getResidents().then((resid) => setResidents(resid));
  }, []);

  const deleteSelectedResident = (residentID: string) => {
    deleteResident(residentID).then(() => {
      setResidents(residents.filter((r) => r.residentID !== residentID));
    });
  };

  return (
    <div css={divStyle}>
      <PageTitle message={'Residentes'} />
      <button
        css={addButtonStyle}
        onClick={() => history.push(`${match.path}/new`)}
      >
        Añadir residente
      </button>
      {residents.map((resident) => (
        <ResidentListCell
          key={resident.residentID}
          deleteResident={() => deleteSelectedResident(resident.residentID)}
          {...resident}
        />
      ))}
    </div>
  );
};

export default ResidentListPage;
