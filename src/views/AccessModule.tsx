import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const styledTitle = css({
  textAlign: 'center',
});

const AccessModule: React.FC = () => {
  return (
    <div>
      <h1 css={styledTitle}>Módulo de acceso</h1>
    </div>
  );
};

export default AccessModule;
