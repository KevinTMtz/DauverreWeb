import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';

const EditPostPage: React.FC = () => {
  const { postID } = useParams<PostParams>();
  return (
    <div>
      <PageTitle message={'Editar publicación'} />
      <h3>Editing post "{postID}"</h3>
    </div>
  );
};

export default EditPostPage;
