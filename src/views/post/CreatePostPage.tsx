import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

import PageTitle from '../../components/PageTitle';
import PostForm from '../../components/post-components/PostForm';

import { createPost } from '../../firebase/db/posts';

const CreatePostPage: React.FC = () => {
  const history = useHistory();

  const [newPostState, setNewPostState] = useState<PostData>({
    title: '',
    date: new Date(),
    content: '',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipP3Ll5USMkZfqPJRnKbH1BSFK1XGk5x2r1La6vF=s1016-k-no',
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createPost(newPostState).then((value) => {
      if ((value as SuccessMessage).success) {
        history.push('/posts');
      }
    });
  };

  return (
    <div>
      <PageTitle message={'Crear publicación'} />
      {
        <PostForm
          post={newPostState}
          onSubmit={onSubmit}
          cancelOperation={() => {
            history.push('/posts');
          }}
          setPostState={setNewPostState}
          buttonMessage={'Crear publicación'}
        />
      }
    </div>
  );
};

export default CreatePostPage;
