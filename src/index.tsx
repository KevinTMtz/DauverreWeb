import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  LoginPage,
  StartPage,
  CreatePostPage,
  EditPostPage,
  PostsListPage,
  ViewPostPage,
  CreateReportPage,
  EditReportPage,
  ViewReportPage,
  EditResidentPage,
  RegisterResidentPage,
  ResidentListPage,
  ViewResidentPage,
} from './views';
import './index.css';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StartPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/posts" component={PostsListPage} />
      <Route path="/post/new" component={CreatePostPage} />
      <Route exact path="/post/:postID" component={ViewPostPage} />
      <Route path="/post/:postID/edit" component={EditPostPage} />
      <Route path="/residents" component={ResidentListPage} />
      <Route path="/resident/new" component={RegisterResidentPage} />
      <Route exact path="/resident/:residentID" component={ViewResidentPage} />
      <Route path="/resident/:residentID/edit" component={EditResidentPage} />
      <Route
        path="/resident/:residentID/newreport"
        component={CreateReportPage}
      />
      <Route
        exact
        path="/resident/:residentID/:reportID"
        component={ViewReportPage}
      />
      <Route
        path="/resident/:residentID/:reportID/edit"
        component={EditReportPage}
      />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
