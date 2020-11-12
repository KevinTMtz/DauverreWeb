import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const buttonStyle = css({
  width: '48%',
  height: '35px',
  borderRadius: '10px',
  fontSize: '18px',
  border: 'none',
  color: 'white',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.01)',
  },
});

export enum BGColor {
  Edit = '#00b894',
  Delete = '#e74c3c',
}

interface EditAndDeleteButtonProps {
  color: BGColor;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const EditAndDeleteButton: React.FC<EditAndDeleteButtonProps> = ({
  color,
  onClick,
  children,
}) => (
  <button
    css={buttonStyle}
    style={{ backgroundColor: color }}
    onClick={onClick}
  >
    {children}
  </button>
);

export default EditAndDeleteButton;
