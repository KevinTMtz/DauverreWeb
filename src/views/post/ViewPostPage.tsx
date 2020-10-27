import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';

const ViewPostPage: React.FC = () => {
  const { postID } = useParams<PostParams>();
  return (
    <div>
      <PageTitle message={'Publicación'} />
      <h3>Viewing post "{postID}"</h3>
    </div>
  );
};

export default ViewPostPage;
