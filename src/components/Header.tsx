import React from 'react';
import { useLocation, Link } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const divStyle = css({
  margin: '0px',
  padding: '8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid #74b9ff',
});

const divLogoAndTitle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const pStyle = css({
  margin: '0px',
  fontSize: '24px',
  fontWeight: 'bold',
  '@media (max-width: 450px)': {
    fontSize: '18px',
  },
  '@media (max-width: 365px)': {
    fontSize: '16px',
  },
  '@media (max-width: 340px)': {
    fontSize: '0px',
  },
});

const logoStyle = css({
  height: '31px',
  marginRight: '10px',
  '@media (max-width: 365px)': {
    marginRight: '5px',
  },
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
  '@media (max-width: 365px)': {
    fontSize: '16px',
  },
});

const Header: React.FC = () => {
  const locationPathname = useLocation().pathname;
  const isInLoginPage =
    locationPathname === '/login' || locationPathname === '/forgotpass';
  const isInStartPage = locationPathname === '/';

  return (
    <div css={divStyle}>
      <div css={divLogoAndTitle}>
        <img
          css={logoStyle}
          alt="logo"
          src={
            'https://firebasestorage.googleapis.com/v0/b/dauverre-ac.appspot.com/o/start_page_images%2FLogo2.png?alt=media&token=a6c48e58-f054-4237-9440-555beb66186c'
          }
        />
        <p css={pStyle}>Dauverre A.C.</p>
      </div>
      {isInStartPage && (
        <Link to="/login" css={linkStyle}>
          Iniciar sesión
        </Link>
      )}
      {isInLoginPage && (
        <Link to="/" css={linkStyle}>
          Cancelar
        </Link>
      )}
    </div>
  );
};

export default Header;
