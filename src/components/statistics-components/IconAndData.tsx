import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import SVGEmoji, { SVGEmojiType } from '../SVGEmoji';

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
    <SVGEmoji
      state={state as SVGEmojiType}
      style={{ width: '40px', height: '40px', margin: 'auto 32px auto 0px' }}
    />
    <p style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0px' }}>
      {total !== -1 ? `${value} de ${total}` : `${value}`}
    </p>
  </div>
);

export default IconAndData;
