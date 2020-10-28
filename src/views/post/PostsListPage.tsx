import { useHistory, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import PostListCell from '../../components/PostListCell';
import PageTitle from '../../components/PageTitle';
import Divisor from '../../components/Divisor';

import { getPosts } from '../../firebase/db/posts';

const addButtonStyle = css({
  width: 'calc(90%)',
  border: '2px solid #0984e3',
  borderRadius: '10px',
  height: '40px',
  backgroundColor: '#74b9ff',
  fontSize: '18px',
  marginBottom: '10px',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.01)',
  },
});

const divStyle = css({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const PostsListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((ps) => setPosts(ps));
  }, []);

  const match = useRouteMatch();
  const history = useHistory();
  function onAddClick() {
    history.push(`${match.path}/new`);
  }

  return (
    <div css={divStyle}>
      <PageTitle message={'Publicaciones'} />
      <button css={addButtonStyle} onClick={onAddClick}>
        Añadir publicación
      </button>
      {posts.map((p) => (
        <PostListCell key={p.postID} {...p} />
      ))}
      <Divisor />
    </div>
  );
};

export default PostsListPage;
