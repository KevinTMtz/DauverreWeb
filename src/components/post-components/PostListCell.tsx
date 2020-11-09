import React from 'react';
import { useHistory } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
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
}) => {
  const history = useHistory();
  return (
    <div css={divStyle}>
      <h1 css={h1Style}>{title}</h1>
      <img src={imageUrl} alt={`Imagen de ${title}`} css={imgStyle}></img>
      <Markdown>{content}</Markdown>
      <div css={buttonsDiv}>
        <EditAndDeleteButton color={BGColor.Delete} onClick={deletePost}>
          Borrar
        </EditAndDeleteButton>
        <EditAndDeleteButton
          color={BGColor.Edit}
          onClick={() => history.push(`/posts/${postID}/edit`)}
        >
          Editar
        </EditAndDeleteButton>
      </div>
    </div>
  );
};

export default PostListCell;
