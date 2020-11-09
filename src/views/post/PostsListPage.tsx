import { useHistory, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import PostListCell from '../../components/post-components/PostListCell';
import PageTitle from '../../components/PageTitle';
import { getPosts, deletePost } from '../../firebase/db/posts';
import { deleteFile } from '../../firebase/storage';

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

const PostsListPage: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    getPosts().then((ps) => setPosts(ps));
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteSelectedPost = (postID: string) => {
    deletePost(postID).then((value) => {
      if (value.state === 'success' && typeof posts !== 'undefined') {
        setPosts(posts.filter((p) => p.postID !== postID));
        deleteFile(`post_images/${postID}`);
        handleOpen();
      }
    });
  };

  return (
    <div css={divStyle}>
      <PageTitle message={'Publicaciones'} />
      <button
        css={addButtonStyle}
        onClick={() => history.push(`${match.path}/new`)}
      >
        Añadir publicación
      </button>
      {typeof posts === 'undefined' ? (
        <div style={{ display: 'flex', alignContent: 'center' }}>
          <CircularProgress
            style={{
              width: '100px',
              height: '100px',
              margin: ' 20vh auto',
              color: '#74b9ff',
            }}
          />
        </div>
      ) : posts.length === 0 ? (
        <h1 style={{ textAlign: 'center' }}>No hay publicaciones existentes</h1>
      ) : (
        posts.map((p) => (
          <PostListCell
            key={p.postID}
            {...p}
            deletePost={() => deleteSelectedPost(p.postID)}
          />
        ))
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          La publicación fue borrada exitosamente
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostsListPage;
