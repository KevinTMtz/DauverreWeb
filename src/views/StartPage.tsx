import React from 'react';
import Markdown from 'markdown-to-jsx';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import Post from '../components/Post';
import Divisor from '../components/Divisor';

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
    'url(https://lh3.ggpht.com/p/AF1QipPXaAOJnSq-IcfJMTqeYZFWv-yuAPaTZrYwY3Hu=s1536)',
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '50vw',
  height: 'auto',
  '@media (max-width: 550px)': {
    height: '25vh',
    width: '100%',
  },
});

const dauverreInfoSubContainer = css({
  padding: '16px',
  width: '50vw',
  minHeight: '25vh',
  '@media (max-width: 550px)': {
    width: '100%',
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

  return (
    <div>
      <div css={mainImgStyle} />
      <Divisor />
      <div css={dauverreInfo}>
        <div css={dauverreInfoSubContainer}>
          <h1>Nuestra misión</h1>
          <Markdown>{missionText}</Markdown>
        </div>
        <div css={dauverreInfoImg} />
      </div>
      <Divisor />
      <div className="postContainer" css={postContainerStyle}>
        <Post />
        <Post />
        <Post />
      </div>
      <Divisor />
    </div>
  );
};

export default StartPage;
