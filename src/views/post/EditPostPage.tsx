import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import Post from '../../components/post-components/Post';
import PostForm from '../../components/post-components/PostForm';

import { getPost, updatePost } from '../../firebase/db/posts';

const EditPostPage: React.FC = () => {
  const history = useHistory();
  const { postID } = useParams<PostParams>();

  const [post, setPost] = useState<Post>({
    title: '',
    date: new Date(),
    content: '',
    imageUrl: '',
    postID: postID,
  });

  useEffect(() => {
    getPost(postID).then((value) => {
      if ((value as NotFoundError).notFound) {
        history.push('/posts');
      } else {
        setPost(value as Post);
      }
    });
  }, [postID, history]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePost({ ...post, postID }).then((value) => {
      if ((value as SuccessMessage).success) {
        history.push('/posts');
      }
    });
  };

  return (
    <div>
      <PageTitle message={'Editar publicación'} />
      <PostForm
        post={post}
        onSubmit={onSubmit}
        setPostState={setPost}
        buttonMessage={'Guardar cambios'}
      />
    </div>
  );
};

export default EditPostPage;
