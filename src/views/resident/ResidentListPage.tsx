import { useHistory, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Backdrop from '@material-ui/core/Backdrop';

import CircularProgressIndicator from '../../components/CircularProgressIndicator';
import PageTitle from '../../components/PageTitle';
import ResidentListCell from '../../components/resident-components/ResidentListCell';
import SearchInput from '../../components/resident-components/ResidentSearch';

import { isAdmin, isPsyOrAdmin } from '../../firebase/auth';
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

interface ResidentListPageProps {
  userAcc: UserAcc | undefined;
}

const ResidentListPage: React.FC<ResidentListPageProps> = ({ userAcc }) => {
  const match = useRouteMatch();
  const history = useHistory();

  const [residents, setResidents] = useState<Resident[]>([]);
  const [displayedResidents, setDisplayedResidents] = useState<Resident[]>([]);
  const [formState, setFormState] = useState<FormState>({ state: 'closed' });
  useEffect(() => {
    const uid = isPsyOrAdmin(userAcc) ? undefined : userAcc?.uid;
    getResidents(uid).then((resid) => {
      setDisplayedResidents(resid);
      setResidents(resid);
    });
  }, [userAcc]);

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
      {isAdmin(userAcc) && (
        <button
          css={addButtonStyle}
          onClick={() => history.push(`${match.path}/new`)}
        >
          Añadir residente
        </button>
      )}
      {displayedResidents.map((dispResident) => (
        <ResidentListCell
          key={dispResident.residentID}
          displayDeleteEditBtns={isAdmin(userAcc)}
          deleteResident={() => deleteSelectedResident(dispResident.residentID)}
          {...dispResident}
        />
      ))}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={formState.state !== 'closed' && formState.state !== 'loading'}
      >
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

      <Backdrop style={{ zIndex: 1000 }} open={formState.state === 'loading'}>
        <CircularProgressIndicator />
      </Backdrop>
    </div>
  );
};

export default ResidentListPage;
