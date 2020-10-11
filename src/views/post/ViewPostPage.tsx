import React from 'react';
import { useParams } from 'react-router-dom';

const ViewPostPage: React.FC = () => {
  const { postID } = useParams<PostParams>();
  return (
    <div>
      <h1>View Post Page</h1>
      <h3>Viewing post "{postID}"</h3>
    </div>
  );
};

export default ViewPostPage;
