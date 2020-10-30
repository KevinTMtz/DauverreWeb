import React from 'react';
import { useHistory } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const divStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  margin: '10px 0px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
  width: 'calc(90% - 32px)',
  '@media (max-width: 600px)': {
    width: 'calc(90% - 32px)',
  },
});

const h1Style = css({
  margin: '5px 0px',
});

const imgStyle = css({
  width: '150px',
  height: '150px',
  objectFit: 'cover',
  margin: '20px auto',
});

const buttonsDiv = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
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

interface PostListCellProps extends Post {
  deletePost: () => void;
}

const PostListCell: React.FC<PostListCellProps> = ({
  content,
  postID,
  title,
  deletePost,
  imageUrl,
}) => {
  const history = useHistory();

  return (
    <div css={divStyle}>
      <h1 css={h1Style}>{title}</h1>
      <img src={imageUrl} alt={`Imagen de ${title}`} css={imgStyle}></img>
      <Markdown>{content}</Markdown>
      <div css={buttonsDiv}>
        <button
          css={editAndDeleteButton}
          style={{ backgroundColor: '#d63031' }}
          onClick={deletePost}
        >
          Borrar
        </button>
        <button
          css={editAndDeleteButton}
          style={{ backgroundColor: '#00b894' }}
          onClick={() => history.push(`/posts/${postID}/edit`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default PostListCell;
