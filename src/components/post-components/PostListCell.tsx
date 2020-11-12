import React from 'react';
import { useHistory } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

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

const pStyle = css({
  margin: '0px',
  color: '#636e72',
});

const imgStyle = css({
  width: 'auto',
  maxWidth: '100%',
  height: '250px',
  objectFit: 'cover',
  margin: '20px auto',
});

const buttonsDiv = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
});

interface PostListCellProps extends Post {
  deletePost: () => void;
}

const PostListCell: React.FC<PostListCellProps> = ({
  content,
  postID,
  title,
  deletePost,
  imageUrl,
  date,
}) => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div css={divStyle}>
      <h1 css={h1Style}>{title}</h1>
      <p css={pStyle}>
        {date.toLocaleDateString('es-MX', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <img src={imageUrl} alt={`Imagen de ${title}`} css={imgStyle}></img>
      <Markdown>{content}</Markdown>
      <div css={buttonsDiv}>
        <EditAndDeleteButton color={BGColor.Delete} onClick={handleOpen}>
          Borrar
        </EditAndDeleteButton>
        <EditAndDeleteButton
          color={BGColor.Edit}
          onClick={() => history.push(`/posts/${postID}/edit`)}
        >
          Editar
        </EditAndDeleteButton>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Borrar publicación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`¿Estás seguro que quieres borrar la publicación: ${title}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={deletePost} color="secondary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostListCell;
