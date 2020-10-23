/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import { Height } from '@material-ui/icons';
import React from 'react';

import Post from '../components/Post';
import Divisor from '../components/Divisor';

const mainImgStyle = css({
  backgroundImage: 'url(https://lh3.ggpht.com/p/AF1QipPXaAOJnSq-IcfJMTqeYZFWv-yuAPaTZrYwY3Hu=s1536)',
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '100%',
  height: '50vh'
})

const dauverreInfo = css({
  display: 'flex'
})

const dauverreInfoImg = css({
  backgroundImage: 'url(https://lh3.ggpht.com/p/AF1QipPXaAOJnSq-IcfJMTqeYZFWv-yuAPaTZrYwY3Hu=s1536)',
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '50vw',
  height: 'auto'
})

const dauverreInfoSubContainer = css({
  padding: '16px',
  width: '50vw',
  minHeight: '25vh'
})

const postContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
})

const StartPage: React.FC = () => (
  <div>
    <div css={mainImgStyle}/>
    <Divisor/>
    <div css={dauverreInfo}>
      <div css={dauverreInfoImg}/>
      <div css={dauverreInfoSubContainer}>
        <h1>Nuestra misión</h1>
        <p>
          Lorem ipsum\n\ndolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n\n * labore\n * et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
    <Divisor/>
    <div className="postContainer" css={postContainerStyle}>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  </div>
);

export default StartPage;
