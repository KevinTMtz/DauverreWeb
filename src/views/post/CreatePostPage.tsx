import React, { useState } from 'react';

import PageTitle from '../../components/PageTitle';
import PostForm from '../../components/post-components/PostForm';

import { createPost } from '../../firebase/db/posts';

const CreatePostPage: React.FC = () => {
  const [newPostState, setNewPostState] = useState<PostData>({
    title: '',
    date: new Date(),
    content: '',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipP3Ll5USMkZfqPJRnKbH1BSFK1XGk5x2r1La6vF=s1016-k-no',
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPost(newPostState);
  };

  return (
    <div>
      <PageTitle message={'Crear publicación'} />
      {
        <PostForm
          post={newPostState}
          onSubmit={onSubmit}
          setNewPostState={setNewPostState}
          buttonMessage={'Crear publicación'}
        />
      }
    </div>
  );
};

export default CreatePostPage;
