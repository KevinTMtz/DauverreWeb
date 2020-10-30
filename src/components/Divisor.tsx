/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import React from 'react';

const divisorStyle = css({
  width: '100%',
  height: '2vh',
  backgroundColor: '#74b9ff',
});

const Divisor: React.FC = () => <div css={divisorStyle}></div>;

export default Divisor;
