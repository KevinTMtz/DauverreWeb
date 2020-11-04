import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import PostForm from '../../components/post-components/PostForm';

import { getPost, updatePost } from '../../firebase/db/posts';
import { getFileLink, uploadFile } from '../../firebase/storage';

const EditPostPage: React.FC = () => {
  const history = useHistory();

  const { postID } = useParams<PostParams>();

  const [post, setPost] = useState<PostData>({
    title: '',
    date: new Date(),
    content: '',
    imageUrl: '',
  });

  const [imageFile, setImageFile] = useState<File>();

  useEffect(() => {
    getPost(postID).then((value) => {
      if (value.state === 'not found') {
        history.push('/posts');
      } else {
        setPost(value.post);
      }
    });

    getFileLink(`post_images/${postID}`).then((value) => {
      if (value.state === 'success') {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          const file = xhr.response;
          file.name = postID;
          file.lastModified = new Date();
          setImageFile(file);
        };
        xhr.open('GET', value.url);
        xhr.send();
      }
    });
  }, [postID, history]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    uploadFile(`post_images/${postID}`, imageFile as File).then((uploadRes) => {
      if (uploadRes.state === 'success') {
        updatePost({ ...post, postID }).then((value) => {
          if (value.state === 'success') {
            history.push('/posts');
          }
        });
      }
    });
  };

  return (
    <div>
      <PageTitle message={'Editar publicación'} />
      <PostForm
        post={post}
        setPostState={setPost}
        imageFile={imageFile}
        setImageFile={setImageFile}
        buttonMessage={'Guardar cambios'}
        onSubmit={onSubmit}
        cancelOperation={() => history.push('/posts')}
      />
    </div>
  );
};

export default EditPostPage;
