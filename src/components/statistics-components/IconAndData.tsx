import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

interface IconAndDataProps {
  value: number;
  total: number;
  imagePath: string;
}

const IconAndData: React.FC<IconAndDataProps> = ({
  value,
  total,
  imagePath,
}) => {
  const styledDiv = css({
    display: 'flex',
    justifyContent: 'center',
    color: '#8884d8',
  });

  return (
    <div css={styledDiv}>
      <img
        src={imagePath}
        alt={`From: ${imagePath}`}
        style={{ width: '50px', height: 'auto', marginRight: '32px' }}
      />
      <p
        style={{ fontSize: '25px', fontWeight: 'bold' }}
      >{`${value} de ${total}`}</p>
    </div>
  );
};

export default IconAndData;
