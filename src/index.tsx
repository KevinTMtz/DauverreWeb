import React, { useState } from 'react';
import firebase from 'firebase/app';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { isAdmin, isLoggedIn } from './firebase/auth';
import AccessModule from './views/AccessModule';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import LoginPage from './views/LoginPage';
import MenuPage from './views/MenuPage';
import NewPasswordPage from './views/NewPasswordPage';
import PostsRouter from './views/post';
import ResidentsRouter from './views/resident';
import StartPage from './views/StartPage';
import StatisticsPage from './views/StatisticsPage';
import './firebase/app';

declare global {
  interface Window {
    firebaseApp: firebase.app.App;
  }
}

const theme = createMuiTheme({
  palette: {
    primary: { main: '#74b9ff' },
    secondary: { main: '#e74c3c' },
  },
  typography: {
    button: {
      fontSize: '18px',
      textTransform: 'none',
    },
  },
});

const App: React.FC = () => {
  const [userAcc, setUserAcc] = useState<UserAcc>();
  return (
    <BrowserRouter>
      <Header userAcc={userAcc} />
      <Switch>
        <Route path="/login">
          <LoginPage setUserAcc={setUserAcc} />
        </Route>
        <Route path="/forgotpass">
          <ForgotPasswordPage />
        </Route>
        <PrivateRoute path="/menu" hasPermission={isLoggedIn(userAcc)}>
          <MenuPage userAcc={userAcc} setUserAcc={setUserAcc} />
        </PrivateRoute>
        <PrivateRoute path="/residents" hasPermission={isLoggedIn(userAcc)}>
          <ResidentsRouter userAcc={userAcc} />
        </PrivateRoute>
        <PrivateRoute path="/newpassword" hasPermission={isLoggedIn(userAcc)}>
          <NewPasswordPage />
        </PrivateRoute>
        <PrivateRoute path="/posts" hasPermission={isAdmin(userAcc)}>
          <PostsRouter />
        </PrivateRoute>
        <PrivateRoute path="/accessmodule" hasPermission={isAdmin(userAcc)}>
          <AccessModule />
        </PrivateRoute>
        <PrivateRoute path="/statistics" hasPermission={isAdmin(userAcc)}>
          <StatisticsPage />
        </PrivateRoute>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
