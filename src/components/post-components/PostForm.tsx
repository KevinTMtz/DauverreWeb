import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import esLocale from 'date-fns/locale/es';

import CircularProgressIndicator from '../CircularProgressIndicator';
import CustomDialog from '../CustomDialog';

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
  imageURL: string | undefined;
  setImageURL: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  onSubmit,
  post,
  setImageFile,
  imageFile,
  imageURL,
  setImageURL,
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
        margin="normal"
        required
        fullWidth
        id="title"
        name="title"
        autoFocus
        value={post.title}
        onChange={(event) =>
          setPostState({ ...post, title: event.target.value })
        }
      />
      <p css={styledP}>Fecha</p>
      <LocalizationProvider dateAdapter={DateFnsAdapter} locale={esLocale}>
        <DatePicker
          value={post.date}
          onChange={(date) =>
            setPostState({ ...post, date: date || new Date() })
          }
          renderInput={(params) => (
            <TextField {...params} margin="normal" variant="standard" />
          )}
        />
      </LocalizationProvider>
      <p css={styledP}>Contenido de texto</p>
      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        minRows={4}
        id="textContent"
        name="textContent"
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
            <CircularProgressIndicator />
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
            onChange={(event) => {
              const newImageFile = event.target.files
                ? event.target.files[0]
                : imageFile;
              setImageFile(newImageFile);
              setImageURL(URL.createObjectURL(newImageFile));
            }}
          />
          {imageFile && (
            <img
              alt="No fue posible mostrar la imagen, cargar de nuevo"
              src={imageURL}
              css={styledInputImagePreview}
            ></img>
          )}
        </label>
      )}
      <Button type="submit" variant="contained" fullWidth>
        {buttonMessage}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        style={{ margin: '20px 0px 40px 0px' }}
        onClick={cancelOperation}
      >
        Cancelar
      </Button>

      <CustomDialog open={open} onClose={isEditing ? handleClose : undefined}>
        <DialogTitle id="alert-dialog-title">Acción terminada</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`La publicación fue ${dialogAction} exitosamente`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isEditing && <Button onClick={handleClose}>Seguir editando</Button>}
          <Button onClick={cancelOperation}>Finalizar</Button>
        </DialogActions>
      </CustomDialog>

      <Backdrop style={{ zIndex: 1000 }} open={openBackdrop}>
        <CircularProgressIndicator />
      </Backdrop>
    </form>
  );
};

export default PostForm;
