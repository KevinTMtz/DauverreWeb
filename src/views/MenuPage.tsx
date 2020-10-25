import { Link } from 'react-router-dom';
import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const styledMainDiv = css({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const styledCellContainer = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const styledCell = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '2px solid #74b9ff',
  width: 'calc(90% - 32px)',
  padding: '0px 16px',
  margin: '10px 0px',
  borderRadius: '10px',
});

const styledLogOut = css({
  textDecoration: 'inherit',
  color: 'inherit',
  marginTop: '16px',
  backgroundColor: '#e74c3c',
  borderRadius: '10px',
  fontSize: '18px',
  padding: '5px 10px',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

const MenuPage: React.FC = () => {
  const options = [
    { name: 'Publicaciones', linkPathname: '/posts' },
    { name: 'Residentes', linkPathname: '/residents' },
    { name: 'Módulo de acceso', linkPathname: '/accessmodule' },
    { name: 'Reporte de la página', linkPathname: '/webpagereport' },
  ];

  return (
    <div css={styledMainDiv}>
      <h1>Menú</h1>
      <div css={styledCellContainer}>
        {options.map((module) => (
          <div key={module.name} css={styledCell}>
            <h2>{module.name}</h2>
            <Link to={module.linkPathname}>Ingresar</Link>
          </div>
        ))}
      </div>
      <Link css={styledLogOut} to="/">
        Cerrar sesión
      </Link>
    </div>
  );
};

export default MenuPage;
