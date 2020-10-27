import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import Post from '../components/Post';
import Divisor from '../components/Divisor';
import PageTitle from '../components/PageTitle';

import { getPosts } from '../firebase/db/posts';

const mainImgStyle = css({
  backgroundImage:
    'url(https://lh3.ggpht.com/p/AF1QipPXaAOJnSq-IcfJMTqeYZFWv-yuAPaTZrYwY3Hu=s1536)',
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '100%',
  height: '50vh',
});

const dauverreInfo = css({
  display: 'flex',
  '@media (max-width: 550px)': {
    flexDirection: 'column',
  },
});

const dauverreInfoImg = css({
  backgroundImage:
    'url(https://scontent-qro1-1.xx.fbcdn.net/v/t1.0-9/78873991_589158318486755_3836700633478463488_n.jpg?_nc_cat=107&ccb=2&_nc_sid=8bfeb9&_nc_ohc=sTWvmvC5QZoAX-BVlm7&_nc_ht=scontent-qro1-1.xx&oh=90a20b13b644fb4323bf96fb6898574c&oe=5FBB2145)',
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '50vw',
  height: 'auto',
  '@media (max-width: 550px)': {
    height: '30vh',
    width: '100%',
  },
});

const dauverreInfoSubContainer = css({
  padding: '25px',
  width: 'calc(50% - 50px)',
  minHeight: '25vh',
  '@media (max-width: 550px)': {
    width: 'calc(100% - 50px)',
  },
});

const postContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
});

const StartPage: React.FC = () => {
  const missionText =
    'Lorem ipsum\n\ndolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut\n\n * labore\n * et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((ps) => setPosts(ps));
  });

  return (
    <div>
      <div css={mainImgStyle} />
      <Divisor />
      <div css={dauverreInfo}>
        <div css={dauverreInfoSubContainer}>
          <PageTitle message={'Nuestra misión'} />
          <Markdown>{missionText}</Markdown>
        </div>
        <div css={dauverreInfoImg} />
      </div>
      <Divisor />
      <PageTitle message={'Publicaciones'} />
      <div className="postContainer" css={postContainerStyle}>
        {posts.map((p) => (
          <Post key={p.postID} {...p} />
        ))}
      </div>
      <Divisor />
    </div>
  );
};

export default StartPage;
