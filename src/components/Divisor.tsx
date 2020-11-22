import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const divisorStyle = css({
  width: '100%',
  height: '2vh',
  backgroundColor: '#74b9ff',
});

const Divisor: React.FC = () => <div css={divisorStyle}></div>;

export default Divisor;
