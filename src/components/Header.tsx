import { useLocation, Link } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import React from 'react';

const divStyle = css({
  margin: '0px',
  padding: '8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid #74b9ff',
});

const pStyle = css({
  margin: '4px 0px',
  fontSize: '24px',
  fontWeight: 'bold',
});

const linkStyle = css({
  textDecoration: 'inherit',
  color: 'inherit',
  backgroundColor: '#74b9ff',
  borderRadius: '10px',
  fontSize: '18px',
  padding: '5px 10px',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

const Header: React.FC = () => {
  const locationPathname = useLocation().pathname;
  const isInLoginPage =
    locationPathname === '/login' || locationPathname === '/forgotpass';
  const isInStartPage = locationPathname === '/' || isInLoginPage;

  return (
    <div css={divStyle}>
      <p css={pStyle}>Dauverre Web</p>
      {isInStartPage && (
        <Link to={isInLoginPage ? '/' : '/login'} css={linkStyle}>
          {isInLoginPage ? 'Cancelar' : 'Iniciar sesión'}
        </Link>
      )}
    </div>
  );
};

export default Header;
