import React from 'react';
import { useParams } from 'react-router-dom';

const EditPostPage: React.FC = () => {
  const { postID } = useParams<PostParams>();
  return (
    <div>
      <h1>Edit Post Page</h1>
      <h3>Editing post "{postID}"</h3>
    </div>
  );
};

export default EditPostPage;
