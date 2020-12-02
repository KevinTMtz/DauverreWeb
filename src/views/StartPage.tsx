import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import FrontPagePost from '../components/post-components/FrontPagePost';
import Divisor from '../components/Divisor';
import PageTitle from '../components/PageTitle';

import { getPosts } from '../firebase/db/posts';

const mainImgStyle = css({
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '100%',
  height: '50vh',
});

const dauverreInfo = css({
  display: 'flex',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
  },
});

const dauverreInfoImg = css({
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '50%',
  height: 'auto',
  '@media (max-width: 600px)': {
    height: '40vh',
    width: '100%',
  },
});

const dauverreInfoSubContainer = css({
  padding: '32px',
  width: 'calc(50% - 64px)',
  minHeight: '25vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media (max-width: 600px)': {
    width: 'calc(100% - 64px)',
  },
});

const postContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  marginBottom: '16px',
});

const founderInfo = css({
  padding: '48px',
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  width: 'auto',
});

const founderImg = css({
  display: 'block',
  objectFit: 'cover',
  height: '350px',
  width: 'auto',
  margin: '32px 0px 32px 48px',
  border: '10px solid white',
  '@media (max-width: 600px)': {
    height: 'auto',
    width: 'calc(100% - 118px)',
    margin: '32px 48px 0px 48px',
  },
});

const dauverreContactImg = css({
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '50%',
  height: 'auto',
  backgroundImage:
    'url(https://firebasestorage.googleapis.com/v0/b/dauverre-ac.appspot.com/o/start_page_images%2FLogo.jpg?alt=media&token=90fcbfde-b3b6-46d3-af6f-2952f5a1dbc0)',
  '@media (max-width: 600px)': {
    height: '30vh',
    width: '100%',
    backgroundImage:
      'url(https://firebasestorage.googleapis.com/v0/b/dauverre-ac.appspot.com/o/start_page_images%2FLogo1.jpg?alt=media&token=de0f9aaf-a8e0-41ea-afc6-97f109690d9e)',
  },
});

const StartPage: React.FC = () => {
  const missionText =
    '### Atender de manera integral a personas de la tercera edad con demencias degenerativas y discapacidad física satisfaciendo sus necesidades básicas y emocionales para mejorar su calidad de vida.';

  const visionText =
    '### Para el 2025, ser una institución sostenible y organizada para la atención de los adultos mayores con demencia degenerativa y discapacidad física, mediante una continua profesionalización de nuestros servicios brindados con calidad y calidez humana.';

  const objectText =
    '## Nuestro propósito es atender integralmente a personas de sesenta y cinco años o más que, por sus carencias socioeconómicas o por problemas de invalidez, se vean impedidas para satisfacer sus requerimientos básicos de subsistencia y desarrollo; proporcionándoles casa, alimentación, vestido, atención médica, atención psicológica, talleres y servicios funerarios.';

  const founderText =
    '# La señora Ana Luisa Dauverre fundó nuestra institución hace más de 100 años.';

  const contactText =
    '### Teléfono: 55 5573 2376\n### Email: dauverreweb@gmail.com\n### Dirección: Triunfo de La Libertad 6, Tlalpan Centro II, Tlalpan, 14000 Ciudad de México, CDMX';

  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    getPosts().then((ps) =>
      setPosts(ps.sort((a, b) => (a.date > b.date ? -1 : 1))),
    );
  }, []);

  return (
    <div>
      <div
        css={mainImgStyle}
        style={{
          backgroundImage:
            'url(https://firebasestorage.googleapis.com/v0/b/dauverre-ac.appspot.com/o/start_page_images%2Fmain.jpg?alt=media&token=dcf08cd0-03f4-4f44-bc03-08d8dc0bdb1d)',
        }}
      />
      <Divisor />
      <div css={dauverreInfo}>
        <div css={dauverreInfoSubContainer}>
          <PageTitle message={'Nuestra misión'} />
          <Markdown>{missionText}</Markdown>
          <PageTitle message={'Nuestra visión'} />
          <Markdown>{visionText}</Markdown>
        </div>
        <div
          css={dauverreInfoImg}
          style={{
            backgroundImage:
              'url(https://firebasestorage.googleapis.com/v0/b/dauverre-ac.appspot.com/o/start_page_images%2Fteam.jpg?alt=media&token=24c880a6-abaa-4ab6-9411-c4cf85bdd37e)',
          }}
        />
      </div>
      <Divisor />
      <div css={dauverreInfo}>
        <div
          css={dauverreInfoImg}
          style={{
            backgroundImage:
              'url(https://firebasestorage.googleapis.com/v0/b/dauverre-ac.appspot.com/o/start_page_images%2Fcorridors.jpg?alt=media&token=1c335e96-32f0-4d37-ac41-5fda53193f74)',
          }}
        />
        <div css={dauverreInfoSubContainer}>
          <Markdown style={{ margin: 'auto 0px' }}>{objectText}</Markdown>
        </div>
      </div>
      {typeof posts !== 'undefined' && posts.length !== 0 && (
        <div>
          <Divisor />
          <PageTitle message={'Conoce nuestras actividades'} />
          <div css={postContainerStyle}>
            {posts.map((p) => (
              <FrontPagePost key={p.postID} {...p} />
            ))}
          </div>
        </div>
      )}

      <Divisor />
      <div css={dauverreInfo} style={{ backgroundColor: '#74b9ff' }}>
        <img
          alt="Founder portrait"
          src={
            'https://firebasestorage.googleapis.com/v0/b/dauverre-ac.appspot.com/o/start_page_images%2Ffounder.jpg?alt=media&token=99f4a1d5-8465-4b45-8434-e27dcb438977'
          }
          css={founderImg}
        />
        <div css={founderInfo}>
          <Markdown style={{ margin: 'auto 0px' }}>{founderText}</Markdown>
        </div>
      </div>
      <Divisor />
      <div css={dauverreInfo}>
        <div css={dauverreInfoSubContainer}>
          <PageTitle message={'Contáctanos'} />
          <Markdown>{contactText}</Markdown>
        </div>
        <div css={dauverreContactImg} />
      </div>
      <Divisor />
    </div>
  );
};

export default StartPage;
