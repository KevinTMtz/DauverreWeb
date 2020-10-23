/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import React from 'react';

const divisorStyle = css({
  height: '2vh',
  backgroundColor: '#74b9ff',
});

const Post: React.FC = () => {
  return <div css={divisorStyle}></div>;
};

export default Post;
