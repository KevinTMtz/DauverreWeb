import { Link } from 'react-router-dom';
import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import PageTitle from '../components/PageTitle';

import EmojiSenior from '../assets/emojis/senior.svg';
import EmojiUser from '../assets/emojis/user.svg';
import EmojiStats from '../assets/emojis/stats.svg';
import EmojiPost from '../assets/emojis/post.svg';

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

const styledLink = css({
  textDecoration: 'inherit',
  color: 'inherit',
  backgroundColor: '#74b9ff',
  borderRadius: '10px',
  fontSize: '16px',
  transitionDuration: '0.3s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '10px 0px',
  padding: '10px 20px',
  width: 'calc(70% - 40px)',
  ':hover': {
    transform: 'scale(1.015)',
  },
  '@media (max-width: 600px)': {
    fontSize: '14px',
    width: 'calc(90% - 40px)',
  },
});

const styledIcon = css({
  width: '75px',
  marginLeft: '16px',
  '@media (max-width: 600px)': {
    width: '50px',
  },
});

const MenuPage: React.FC = () => {
  const options = [
    { name: 'Publicaciones', toPath: '/posts', image: EmojiPost },
    { name: 'Residentes', toPath: '/residents', image: EmojiSenior },
    {
      name: 'Módulo de acceso',
      toPath: '/accessmodule',
      image: EmojiUser,
    },
    { name: 'Estadísticas', toPath: '/statistics', image: EmojiStats },
  ];

  return (
    <div css={styledMainDiv}>
      <PageTitle message={'Menú'} />
      <div css={styledCellContainer}>
        {options.map((module, index) => (
          <Link
            key={`${module.name}: ${index}`}
            to={module.toPath}
            css={styledLink}
          >
            <h2>{module.name}</h2>
            <img alt={`${module.name}`} src={module.image} css={styledIcon} />
          </Link>
        ))}
      </div>
      <Link
        to="/"
        css={styledLink}
        style={{
          backgroundColor: '#e74c3c',
          margin: '40px 0px',
        }}
      >
        <h2 style={{ margin: '0px', textAlign: 'center', width: '100%' }}>
          Cerrar sesión
        </h2>
      </Link>
    </div>
  );
};

export default MenuPage;
