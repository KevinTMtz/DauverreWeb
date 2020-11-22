import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface CircularProgressIndicatorProps {
  size?: string;
  margin?: string;
}

const CircularProgressIndicator: React.FC<CircularProgressIndicatorProps> = ({
  size,
  margin,
}) => (
  <CircularProgress
    style={{
      width: size || '75px',
      height: size || '75px',
      margin: margin || '25px',
      color: '#74b9ff',
    }}
  />
);

export default CircularProgressIndicator;
