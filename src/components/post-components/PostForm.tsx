import React from 'react';
import 'date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const styledForm = css({
  width: '70%',
  margin: 'auto',
  fontSize: '18px',
  fontWeight: 'bold',
  transitionDuration: '0.3s',
  '@media (max-width: 600px)': {
    width: '90%',
  },
});

const styledP = css({
  margin: '30px 0px 10px 0px',
});

const styledInputImage = css({
  height: '0px',
  opacity: '0',
  position: 'relative',
  top: '-30px',
});

const styledInputImageLabel = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 16px',
  cursor: 'pointer',
  textAlign: 'center',
  width: 'calc(100% - 34px)',
  marginBottom: '50px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  ':hover': {
    border: '1px solid black',
  },
});

const styledInputImagePreview = css({
  maxWidth: '50%',
  maxHeight: '300px',
  marginTop: '16px',
  '@media (max-width: 600px)': {
    maxWidth: '90%',
  },
});

interface PostFormProps {
  post: PostData;
  setPostState: React.Dispatch<React.SetStateAction<PostData>>;
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  buttonMessage: string;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    callDialog: () => void,
    openBackdrop: () => void,
  ) => void;
  cancelOperation: () => void;
  isEditing: boolean;
  dialogAction: string;
}

const PostForm: React.FC<PostFormProps> = ({
  buttonMessage,
  cancelOperation,
  imageFile,
  onSubmit,
  post,
  setImageFile,
  setPostState,
  isEditing,
  dialogAction,
}) => {
  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleOpen = () => {
    setOpenBackdrop(false);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <form
      autoComplete="off"
      onSubmit={(event) =>
        onSubmit(event, handleOpen, () => setOpenBackdrop(true))
      }
      css={styledForm}
    >
      <p css={styledP}>Título</p>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Título"
        name="title"
        autoComplete="username"
        autoFocus
        value={post.title}
        onChange={(event) =>
          setPostState({ ...post, title: event.target.value })
        }
      />
      <p css={styledP}>Fecha</p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          fullWidth
          value={post.date}
          onChange={(event) =>
            setPostState({ ...post, date: new Date(event!.valueOf()) })
          }
          KeyboardButtonProps={{ 'aria-label': 'change date' }}
        />
      </MuiPickersUtilsProvider>
      <p css={styledP}>Contenido de texto</p>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        multiline
        id="textContent"
        label="Contenido textual"
        name="textContent"
        autoComplete="username"
        autoFocus
        value={post.content}
        onChange={(event) =>
          setPostState({ ...post, content: event.target.value })
        }
      />
      <p css={styledP}>Imagen</p>
      {typeof imageFile === 'undefined' && isEditing ? (
        <label css={styledInputImageLabel}>
          <div style={{ display: 'flex', alignContent: 'center' }}>
            <CircularProgress
              style={{
                width: '75px',
                height: '75px',
                margin: '25px',
                color: '#74b9ff',
              }}
            />
          </div>
        </label>
      ) : (
        <label css={styledInputImageLabel}>
          {imageFile ? `Cambiar imagen: ${imageFile.name}` : 'Subir imagen'}
          <input
            type="file"
            accept="image/*"
            css={styledInputImage}
            required={imageFile ? false : true}
            onChange={(event) =>
              setImageFile(
                event.target.files ? event.target.files[0] : imageFile,
              )
            }
          />
          {imageFile && (
            <img
              alt="No fue posible mostrar la imagen, cargar de nuevo"
              src={URL.createObjectURL(imageFile)}
              css={styledInputImagePreview}
            ></img>
          )}
        </label>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {buttonMessage}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        style={{ margin: '20px 0px 40px 0px' }}
        onClick={cancelOperation}
      >
        Cancelar
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="alert-dialog-title">Acción terminada</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`La publicación fue ${dialogAction} exitosamente`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Seguir editando</Button>
          <Button onClick={cancelOperation} color="primary">
            Finalizar
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop style={{ zIndex: 1000 }} open={openBackdrop}>
        <CircularProgress
          style={{
            width: '75px',
            height: '75px',
            margin: '25px',
            color: '#74b9ff',
          }}
        />
      </Backdrop>
    </form>
  );
};

export default PostForm;
