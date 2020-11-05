import React from 'react';
import 'date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const styledForm = css({
  width: '80%',
  margin: 'auto',
  '@media (max-width: 600px)': {
    width: '90%',
  },
  fontSize: '18px',
  fontWeight: 'bold',
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
  border: '1px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 16px',
  cursor: 'pointer',
  width: 'calc(100% - 34px)',
  marginBottom: '50px',
  borderRadius: '4px',
  ':hover': {
    border: '1px solid black',
  },
});

const styledInputImagePreview = css({
  maxWidth: '50%',
  maxHeight: '300px',
});

interface PostFormProps {
  post: PostData;
  setPostState: React.Dispatch<React.SetStateAction<PostData>>;
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  buttonMessage: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  cancelOperation: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  buttonMessage,
  cancelOperation,
  imageFile,
  onSubmit,
  post,
  setImageFile,
  setPostState,
}) => (
  <form autoComplete="off" onSubmit={onSubmit} css={styledForm}>
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
      onChange={(event) => setPostState({ ...post, title: event.target.value })}
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
    <label css={styledInputImageLabel}>
      {imageFile ? `Cambiar imagen: ${imageFile.name}` : 'Subir imagen'}
      <input
        type="file"
        accept="image/*"
        css={styledInputImage}
        required={imageFile ? false : true}
        onChange={(event) =>
          setImageFile(event.target.files ? event.target.files[0] : imageFile)
        }
      />
      {imageFile && (
        <img
          alt="No fue posible mostrar la imagen, cargar de nuevo"
          src={URL.createObjectURL(imageFile)}
          style={{
            marginTop: '16px',
          }}
          css={styledInputImagePreview}
        ></img>
      )}
    </label>
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
  </form>
);

export default PostForm;
