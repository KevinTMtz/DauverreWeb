import React from 'react';
import firebase from 'firebase/app';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import AccessModule from './views/AccessModule';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import GlobalReportPage from './views/GlobalReportPage';
import LoginPage from './views/LoginPage';
import MenuPage from './views/MenuPage';
import PostsRouter from './views/post';
import ResidentsRouter from './views/resident';
import StartPage from './views/StartPage';
import WeeklyReportPage from './views/WeeklyReportPage';
import './firebase/app';

declare global {
  interface Window {
    firebaseApp: firebase.app.App;
  }
}

const App: React.FC = () => (
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
      <Route path="/globalreport">
        <GlobalReportPage />
      </Route>
      <Route path="/weeklyreport">
        <WeeklyReportPage />
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
