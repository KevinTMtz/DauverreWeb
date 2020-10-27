import React, { useEffect, useState } from 'react';

import { getPosts } from '../../firebase/db/posts';

import PostListCell from '../../components/PostListCell';
import PageTitle from '../../components/PageTitle';

const PostsListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((ps) => setPosts(ps));
  });
  return (
    <div>
      <PageTitle message={'Posts List Page'} />
      {posts.map((p) => (
        <PostListCell key={p.postID} {...p} />
      ))}
    </div>
  );
};

export default PostsListPage;
