import { useLocation } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import React from 'react';

const divStyle = css({
  margin: '0px',
  padding: '8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const pStyle = css({
  margin: '0px',
  fontSize: '24px',
  fontWeight: 'bold',
});

const buttonStyle = css({
  backgroundColor: '#74b9ff',
  border: '0px solid black',
  borderRadius: '10px',
  fontSize: '18px',
  padding: '5px 10px',
});

const Header: React.FC = () => {
  const isInLoginPage = useLocation().pathname === '/'

  return (
    <div css={divStyle}>
      <p css={pStyle}>Dauverre Web</p>
      {isInLoginPage && 
        <button css={buttonStyle}>
          Iniciar sesión
        </button>
      }
    </div>
  );
};

export default Header;
