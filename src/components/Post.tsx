import React from 'react';
import Markdown from 'markdown-to-jsx';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const divStyle = css({
  padding: '16px',
  margin: '10px',
  borderRadius: '10px',
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
  maxWidth: '40vw',
  '@media (max-width: 600px)': {
    maxWidth: '90vw',
  },
});

// {isSmallScreen ? '90vw' : '40vw'}

const h1Style = css({
  margin: '5px 0px',
});

const imgStyle = css({
  width: '100%',
  height: '300px',
  objectFit: 'cover',
});

const Post: React.FC = () => {
  const postText =
    'Lorem ipsum\n\ndolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut\n\n * labore\n * et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  return (
    <div css={divStyle}>
      <h1 css={h1Style}>Título</h1>
      <img
        src="https://lh3.ggpht.com/p/AF1QipPXaAOJnSq-IcfJMTqeYZFWv-yuAPaTZrYwY3Hu=s1536"
        alt="Institución Dauverre, Fachada"
        css={imgStyle}
      ></img>
      <Markdown>{postText}</Markdown>
    </div>
  );
};

export default Post;
