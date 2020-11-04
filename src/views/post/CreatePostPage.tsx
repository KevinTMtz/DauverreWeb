import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import PostForm from '../../components/post-components/PostForm';
import { db } from '../../firebase/app';
import { createPost } from '../../firebase/db/posts';
import { uploadFile } from '../../firebase/db/storage';

const CreatePostPage: React.FC = () => {
  const history = useHistory();

  const [newPostState, setNewPostState] = useState<PostData>({
    title: '',
    date: new Date(),
    content: '',
    imageUrl: '',
  });

  const [imageFile, setImageFile] = useState<File>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postID = db.collection('posts').doc().id;

    uploadFile(`post_images/${postID}`, imageFile as File).then((uploadRes) => {
      if (uploadRes.state === 'success') {
        createPost({ ...newPostState, imageUrl: uploadRes.url }, postID).then(
          (value) => {
            if (value.state === 'success') {
              history.push('/posts');
            }
          },
        );
      }
    });
  };

  return (
    <div>
      <PageTitle message={'Crear publicación'} />
      <PostForm
        post={newPostState}
        setPostState={setNewPostState}
        imageFile={imageFile}
        setImageFile={setImageFile}
        buttonMessage={'Crear publicación'}
        onSubmit={onSubmit}
        cancelOperation={() => history.push('/posts')}
      />
    </div>
  );
};

export default CreatePostPage;
