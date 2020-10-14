import { useLocation, useRouteMatch } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import React from 'react';

const divStyle = css({
  margin: '0px',
  borderBottom: '1px solid black',
  padding: '8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})

const pStyle = css({
  margin: '0px',
  fontSize: '24px'
})

const buttonStyle = css({
  backgroundColor: '#74b9ff',
  border: '0px solid black',
  borderRadius: '10px',
  fontSize: '18px',
  padding: '5px 10px'
})

const Header: React.FC = () => {
  const location = useLocation();
  console.log(location);
  const match = useRouteMatch();
  console.log(match);
  
  return (
    <div css={divStyle}>
      <p css={pStyle}>Dauverre Web</p>
      <button css={buttonStyle}>Iniciar sesión</button>
    </div>
  );
};

export default Header;
