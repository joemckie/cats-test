import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Routes } from './config/routes';
import { HomePage } from './pages/home/HomePage';
import { UploadPage } from './pages/upload/UploadPage';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={Routes.Upload}>
        <UploadPage />
      </Route>
      <Route path={Routes.Home}>
        <HomePage />
      </Route>
    </Switch>
  </BrowserRouter>
);
