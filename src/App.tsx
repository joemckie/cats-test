import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './components/GlobalStyles/GlobalStyles';
import { Routes } from './config/routes';
import { HomePage } from './pages/home/HomePage';
import { UploadPage } from './pages/upload/UploadPage';

export const App = () => (
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
);
