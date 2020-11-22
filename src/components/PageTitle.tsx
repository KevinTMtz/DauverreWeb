import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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
