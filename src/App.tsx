import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { GlobalStyle } from './components/GlobalStyle/GlobalStyle';
import { Routes } from './config/routes';
import { HomePage } from './pages/home/HomePage';
import { UploadPage } from './pages/upload/UploadPage';
import { StoreProvider } from './store';

export const App = () => (
  <StoreProvider>
    <ToastProvider placement="bottom-right">
      <Router>
        <GlobalStyle />
        <Switch>
          <Route path={Routes.Upload}>
            <UploadPage />
          </Route>
          <Route path={Routes.Home}>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </ToastProvider>
  </StoreProvider>
);
