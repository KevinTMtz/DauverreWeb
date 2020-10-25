import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const styledTitle = css({
  textAlign: 'center',
});

const WebpageReport: React.FC = () => {
  return (
    <div>
      <h1 css={styledTitle}>Reporte de la página</h1>
    </div>
  );
};

export default WebpageReport;
