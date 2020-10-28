import { useHistory, useRouteMatch } from 'react-router-dom';
import React from 'react';
import Markdown from 'markdown-to-jsx';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const divStyle = css({
  padding: '16px',
  margin: '10px 0px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
  maxWidth: 'calc(90% - 32px)',
  '@media (max-width: 600px)': {
    maxWidth: 'calc(90% - 32px)',
  },
});

const h1Style = css({
  margin: '5px 0px',
});

const imgStyle = css({
  width: '150px',
  height: '150px',
  objectFit: 'cover',
});

const buttonsDiv = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const editAndDeleteButton = css({
  width: '48%',
  height: '35px',
  borderRadius: '10px',
  fontSize: '18px',
  border: '2px solid #0984e3',
  color: 'white',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.01)',
  },
});

const PostListCell: React.FC<Post> = ({ postID, title, imageUrl, content }) => {
  const match = useRouteMatch();
  const history = useHistory();

  function onEditClick() {
    history.push(`${match.path}/${postID}/edit`);
  }

  return (
    <div css={divStyle}>
      <h1 css={h1Style}>{title}</h1>
      <img src={imageUrl} alt={`Imagen de ${title}`} css={imgStyle}></img>
      <Markdown>{content}</Markdown>
      <div css={buttonsDiv}>
        <button
          css={editAndDeleteButton}
          style={{ backgroundColor: '#d63031' }}
        >
          Borrar
        </button>
        <button
          css={editAndDeleteButton}
          style={{ backgroundColor: '#00b894' }}
          onClick={onEditClick}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default PostListCell;
