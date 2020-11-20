import { useHistory, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import CircularProgressIndicator from '../../components/CircularProgressIndicator';
import PageTitle from '../../components/PageTitle';
import ResidentListCell from '../../components/resident-components/ResidentListCell';
import SearchInput from '../../components/resident-components/ResidentSearch';

import { getResidents } from '../../firebase/db/residents';
import { deleteResident } from '../../firebase/functions';

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
  const [displayedResidents, setDisplayedResidents] = useState<Resident[]>([]);
  const [formState, setFormState] = useState<FormState>({ state: 'closed' });
  useEffect(() => {
    getResidents().then((resid) => {
      setDisplayedResidents(resid);
      setResidents(resid);
    });
  }, []);

  const deleteSelectedResident = (residentID: string) => {
    setFormState({ state: 'loading' });
    deleteResident(residentID).then((resp) => {
      if (resp.state === 'success') {
        setResidents(residents.filter((r) => r.residentID !== residentID));
        setDisplayedResidents(
          displayedResidents.filter((r) => r.residentID !== residentID),
        );
        setFormState({ state: 'closed' });
      } else {
        setFormState({
          state: 'server error',
          message: 'El servidor tiene problemas con tu solicitud',
        });
      }
    });
  };

  return (
    <div css={divStyle}>
      <PageTitle message={'Residentes'} />
      <SearchInput
        residentsList={residents}
        setDisplayedResidents={setDisplayedResidents}
      />
      <button
        css={addButtonStyle}
        onClick={() => history.push(`${match.path}/new`)}
      >
        Añadir residente
      </button>
      {displayedResidents.map((dispResident) => (
        <ResidentListCell
          key={dispResident.residentID}
          deleteResident={() => deleteSelectedResident(dispResident.residentID)}
          {...dispResident}
        />
      ))}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={formState.state !== 'closed'}
      >
        {formState.state === 'loading' && (
          <DialogContent>
            <CircularProgressIndicator />
          </DialogContent>
        )}
        {formState.state === 'server error' && (
          <React.Fragment>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>{formState.message}</DialogContent>
            <DialogActions>
              <Button
                onClick={() => setFormState({ state: 'closed' })}
                color="primary"
              >
                Ok
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </div>
  );
};

export default ResidentListPage;
