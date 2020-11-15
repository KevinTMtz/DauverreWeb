import { useHistory, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import PageTitle from '../../components/PageTitle';
import ResidentListCell from '../../components/resident-components/ResidentListCell';
import SearchInput from '../../components/resident-components/ResidentSearch';

import { getResidents, deleteResident } from '../../firebase/db/residents';

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

const divStyle = css({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '16px',
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
      <SearchInput residentsList={residents} />
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
