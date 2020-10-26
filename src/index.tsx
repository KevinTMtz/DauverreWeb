import React from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import firebaseConfig from './firebase/config';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import LoginPage from './views/LoginPage';
import PostsRouter from './views/post';
import ResidentsRouter from './views/resident';
import StartPage from './views/StartPage';
import MenuPage from './views/MenuPage';
import AccessModule from './views/AccessModule';
import WebpageReport from './views/WebpageReport';

const App: React.FC = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/forgotpass">
          <ForgotPasswordPage />
        </Route>
        <Route path="/menu">
          <MenuPage />
        </Route>
        <Route path="/posts">
          <PostsRouter />
        </Route>
        <Route path="/residents">
          <ResidentsRouter />
        </Route>
        <Route path="/accessmodule">
          <AccessModule />
        </Route>
        <Route path="/webpagereport">
          <WebpageReport />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
