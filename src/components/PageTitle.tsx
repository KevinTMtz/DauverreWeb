import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

interface PageTitleProps {
  message: string;
}

const styledTitle = css({
  textAlign: 'center',
});

const PageTitle: React.FC<PageTitleProps> = ({ message }) => (
  <h1 css={styledTitle}>{message}</h1>
);

export default PageTitle;
