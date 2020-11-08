import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import Post from '../components/post-components/Post';
import Divisor from '../components/Divisor';
import PageTitle from '../components/PageTitle';

import { getPosts } from '../firebase/db/posts';

const mainImgStyle = css({
  backgroundImage:
    'url(https://lh3.ggpht.com/p/AF1QipPXaAOJnSq-IcfJMTqeYZFWv-yuAPaTZrYwY3Hu=s1536)',
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '100%',
  height: '50vh',
});

const dauverreInfo = css({
  display: 'flex',
  '@media (max-width: 550px)': {
    flexDirection: 'column',
  },
});

const dauverreInfoImg = css({
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  width: '50%',
  height: 'auto',
  '@media (max-width: 550px)': {
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
  '@media (max-width: 550px)': {
    width: 'calc(100% - 64px)',
  },
});

const postContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  marginBottom: '16px',
});

const StartPage: React.FC = () => {
  const missionText =
    '### Atender de manera integral a personas de la tercera edad con demencias degenerativas y discapacidad física satisfaciendo sus necesidades básicas y emocionales para mejorar su calidad de vida.';

  const visionText =
    '### Para el 2025, ser una institución sostenible y organizada para la atención de los adultos mayores con demencia degenerativa y discapacidad física, mediante una continua profesionalización de nuestros servicios brindados con calidad y calidez humana.';

  const objectText =
    '## Nuestro propósito es atender integralmente a personas de sesenta y cinco años o más que, por sus carencias socioeconómicas o por problemas de invalidez, se vean impedidas para satisfacer sus requerimientos básicos de subsistencia y desarrollo; proporcionándoles casa, alimentación, vestido, atención médica, atención psicológica, talleres y servicios funerarios.';

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((ps) => setPosts(ps));
  }, []);

  return (
    <div>
      <div css={mainImgStyle} />
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
              'url(https://scontent-qro1-1.xx.fbcdn.net/v/t1.0-9/78873991_589158318486755_3836700633478463488_n.jpg?_nc_cat=107&ccb=2&_nc_sid=8bfeb9&_nc_ohc=sTWvmvC5QZoAX-BVlm7&_nc_ht=scontent-qro1-1.xx&oh=90a20b13b644fb4323bf96fb6898574c&oe=5FBB2145)',
          }}
        />
      </div>
      <Divisor />
      <div css={dauverreInfo}>
        <div
          css={dauverreInfoImg}
          style={{
            backgroundImage:
              'url(https://lh5.googleusercontent.com/p/AF1QipP3Ll5USMkZfqPJRnKbH1BSFK1XGk5x2r1La6vF=s1016-k-no)',
          }}
        />
        <div css={dauverreInfoSubContainer}>
          <Markdown style={{ margin: 'auto 0px' }}>{objectText}</Markdown>
        </div>
      </div>
      <Divisor />
      <PageTitle message={'Conoce nuestras actividades'} />
      <div className="postContainer" css={postContainerStyle}>
        {posts.map((p) => (
          <Post key={p.postID} {...p} />
        ))}
      </div>
    </div>
  );
};

export default StartPage;
