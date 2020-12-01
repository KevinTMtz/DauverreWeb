import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import EditAndDeleteButton, { BGColor } from '../EditAndDeleteButton';

const divStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  margin: '10px 0px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
  width: 'calc(70% - 32px)',
  transitionDuration: '0.3s',
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

const seeReportsButton = css({
  backgroundColor: BGColor.View,
  width: '100%',
  height: '35px',
  borderRadius: '10px',
  fontSize: '18px',
  border: 'none',
  color: 'white',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.01)',
  },
});

interface ResidentListCellProps extends Resident {
  deleteResident: () => void;
  displayDeleteEditBtns: boolean;
}

const ResidentListCell: React.FC<ResidentListCellProps> = ({
  residentID,
  firstName,
  lastName,
  gender,
  isVisible,
  birthDate,
  deleteResident,
  displayDeleteEditBtns,
}) => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div css={divStyle}>
      <h1 css={h1Style}>
        {firstName} {lastName}
      </h1>
      <div>
        <h5>Sexo: {gender}</h5>
        <h5>
          Fecha de nacimiento: {format(birthDate, 'PPPP', { locale: es })}
        </h5>
        {isVisible || (
          <h5>Este residente no se encuentra actualmente en la institución</h5>
        )}
      </div>
      <button
        css={seeReportsButton}
        onClick={() => history.push(`/residents/${residentID}`)}
      >
        Ver reportes
      </button>
      {displayDeleteEditBtns && (
        <div css={buttonsDiv}>
          <EditAndDeleteButton color={BGColor.Delete} onClick={handleOpen}>
            Borrar
          </EditAndDeleteButton>
          <EditAndDeleteButton
            color={BGColor.Edit}
            onClick={() => history.push(`/residents/${residentID}/edit`)}
          >
            Editar
          </EditAndDeleteButton>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Borrar residente</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`¿Estás seguro que quieres borrar el residente: ${firstName} ${lastName}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() => {
              handleClose();
              deleteResident();
            }}
            color="secondary"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResidentListCell;
