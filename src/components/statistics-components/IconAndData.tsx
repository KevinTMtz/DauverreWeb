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
      style={{ width: '40px', height: '40px', margin: 'auto 32px auto 0px' }}
    />
    <p
      style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0px' }}
    >{`${value} de ${total}`}</p>
  </div>
);

export default IconAndData;
