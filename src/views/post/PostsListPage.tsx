import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

import { getPosts } from '../../firebase/db/posts';

const PostsListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((ps) => setPosts(ps));
  });
  return (
    <div>
      <h1>Posts List Page</h1>
      {posts.map((p) => (
        <div key={p._id}>
          <img
            alt={`Imagen para el post "${p.title}"`}
            src={p.imageUrl}
            height="200px"
          />
          <h1>{p.title}</h1>
          <Markdown>{p.content}</Markdown>
        </div>
      ))}
    </div>
  );
};

export default PostsListPage;
