import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CreatePostPage from './CreatePostPage';
import EditPostPage from './EditPostPage';
import PostsListPage from './PostsListPage';
import ViewPostPage from './ViewPostPage';

const PostsRouter: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <CreatePostPage />
      </Route>
      <Route path={`${match.path}/:postID/edit`}>
        <EditPostPage />
      </Route>
      <Route path={`${match.path}/:postID`}>
        <ViewPostPage />
      </Route>
      <Route path={match.path}>
        <PostsListPage />
      </Route>
    </Switch>
  );
};

export default PostsRouter;
