import { useHistory, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import PostListCell from '../../components/post-components/PostListCell';
import PageTitle from '../../components/PageTitle';

import { getPosts, deletePost } from '../../firebase/db/posts';
import { deleteFile } from '../../firebase/db/storage';

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
  const match = useRouteMatch();
  const history = useHistory();

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((ps) => setPosts(ps));
  }, []);

  const deleteSelectedPost = (postIndex: number, postID: string) => {
    deletePost(postID).then((value) => {
      if ((value as SuccessMessage).success) {
        const newPosts = [...posts];
        newPosts.splice(postIndex, 1);
        setPosts(newPosts);

        deleteFile(`post_images/${postID}`);
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
      {posts.map((p, index) => (
        <PostListCell
          key={p.postID}
          {...p}
          deletePost={() => deleteSelectedPost(index, p.postID)}
        />
      ))}
    </div>
  );
};

export default PostsListPage;
