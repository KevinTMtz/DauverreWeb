import React from 'react';
import Markdown from 'markdown-to-jsx';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const divStyle = css({
  padding: '16px',
  margin: '10px 0px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
  width: 'calc(45vw - 32px)',
  '@media (max-width: 600px)': {
    width: 'calc(90vw - 32px)',
  },
});

const h1Style = css({
  margin: '5px 0px',
});

const imgStyle = css({
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  margin: '20px auto',
});

interface FrontPagePostProps extends Post {}

const FrontPagePost: React.FC<FrontPagePostProps> = ({
  title,
  imageUrl,
  content,
}) => (
  <div css={divStyle}>
    <h1 css={h1Style}>{title}</h1>
    <img src={imageUrl} alt={`Imagen de ${title}`} css={imgStyle}></img>
    <Markdown>{content}</Markdown>
  </div>
);

export default FrontPagePost;