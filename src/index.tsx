import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './views/LoginPage';
import PostsRouter from './views/post';
import ResdientsRouter from './views/resident';
import StartPage from './views/StartPage';
import './index.css';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/posts">
        <PostsRouter />
      </Route>
      <Route path="/residents">
        <ResdientsRouter />
      </Route>
      <Route path="/">
        <StartPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
