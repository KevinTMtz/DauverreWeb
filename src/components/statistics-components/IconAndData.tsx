import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import StateEmoji, { StateEmojiType } from '../report-components/StateEmoji';

const styledDiv = css({
  display: 'flex',
  justifyContent: 'center',
  color: '#8884d8',
});

interface IconAndDataProps {
  value: number;
  total: number;
  state: string;
}

const IconAndData: React.FC<IconAndDataProps> = ({ value, total, state }) => (
  <div css={styledDiv}>
    <StateEmoji
      state={state as StateEmojiType}
      style={{ width: '50px', height: '50px', margin: 'auto 32px' }}
    />
    <p
      style={{ fontSize: '25px', fontWeight: 'bold' }}
    >{`${value} de ${total}`}</p>
  </div>
);

export default IconAndData;
