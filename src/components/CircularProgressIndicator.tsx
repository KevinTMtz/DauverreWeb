import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const CircularProgressIndicator: React.FC = () => (
  <CircularProgress
    style={{
      width: '75px',
      height: '75px',
      margin: '25px',
      color: '#74b9ff',
    }}
  />
);

export default CircularProgressIndicator;
