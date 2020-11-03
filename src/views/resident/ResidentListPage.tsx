import { useHistory, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import PageTitle from '../../components/PageTitle';

import { getResidents, deleteResident } from '../../firebase/db/residents';
import ResidentListCell from '../../components/resident-components/ResidentListCell';

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

  const deleteSelectedResident = (
    residentIndex: number,
    residentID: string,
  ) => {
    deleteResident(residentID).then((value) => {
      if ((value as SuccessMessage).success) {
        const newResidents = [...residents];
        newResidents.splice(residentIndex, 1);
        setResidents(newResidents);
      }
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
      {residents.map((r, index) => (
        <ResidentListCell
          key={r.residentID}
          {...r}
          deleteResident={() => deleteSelectedResident(index, r.residentID)}
        />
      ))}
    </div>
  );
};

export default ResidentListPage;
