import React from 'react';
import { useHistory, Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import PageTitle from '../components/PageTitle';
import { BGColor } from '../components/EditAndDeleteButton';

import EmojiSenior from '../assets/emojis/senior.svg';
import EmojiUser from '../assets/emojis/user.svg';
import EmojiStats from '../assets/emojis/stats.svg';
import EmojiPassword from '../assets/emojis/password.svg';
import EmojiPost from '../assets/emojis/post.svg';
import { signOut } from '../firebase/auth';

const styledMainDiv = css({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '0px auto',
  width: '70%',
  '@media (max-width: 600px)': {
    width: '90%',
  },
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
  width: 'calc(100% - 40px)',
  ':hover': {
    transform: 'scale(1.015)',
  },
  '@media (max-width: 600px)': {
    fontSize: '14px',
  },
});

const styledIcon = css({
  width: '75px',
  marginLeft: '16px',
  '@media (max-width: 600px)': {
    width: '50px',
  },
});

const logOutButton = css({
  backgroundColor: BGColor.Delete,
  width: '100%',
  borderRadius: '10px',
  fontSize: '18px',
  border: 'none',
  color: 'white',
  margin: '40px 0px',
  padding: '10px 0px',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.015)',
  },
});

interface MenuPageProps {
  setUserAcc: React.Dispatch<React.SetStateAction<UserAcc | undefined>>;
}

const MenuPage: React.FC<MenuPageProps> = ({ setUserAcc }) => {
  const history = useHistory();
  const options = [
    { name: 'Publicaciones', toPath: '/posts', image: EmojiPost },
    { name: 'Residentes', toPath: '/residents', image: EmojiSenior },
    {
      name: 'Módulo de acceso',
      toPath: '/accessmodule',
      image: EmojiUser,
    },
    { name: 'Estadísticas', toPath: '/statistics', image: EmojiStats },
    {
      name: 'Cambiar contraseña',
      toPath: '/newpassword',
      image: EmojiPassword,
    },
  ];

  const signOutAndExit = async () => {
    await signOut();
    setUserAcc(undefined);
    history.push('/');
  };

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
      <button css={logOutButton} onClick={signOutAndExit}>
        <h2 style={{ margin: '0px', textAlign: 'center', width: '100%' }}>
          Cerrar sesión
        </h2>
      </button>
    </div>
  );
};

export default MenuPage;
