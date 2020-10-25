import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const styledTitle = css({
  textAlign: 'center',
});

const MenuPage: React.FC = () => {
  return (
    <div>
      <h1 css={styledTitle}>Menu</h1>
    </div>
  );
};

export default MenuPage;
