import React from 'react';
import firebase from 'firebase/app';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import Header from './components/Header';
import AccessModule from './views/AccessModule';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import LoginPage from './views/LoginPage';
import MenuPage from './views/MenuPage';
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
    primary: {
      main: '#74b9ff',
    },
    secondary: {
      main: '#e74c3c',
    },
  },
  typography: {
    button: {
      fontSize: '18px',
      textTransform: 'none',
    },
  },
});

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
      <Route path="/statistics">
        <StatisticsPage />
      </Route>
      <Route path="/">
        <StartPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
