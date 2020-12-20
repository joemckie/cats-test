import { Link } from 'react-router-dom';
import { Routes } from '../../config/routes';

export const HomePage = () => (
  <div>
    <h1>Home</h1>
    <Link to={Routes.Upload}>Go to upload page</Link>
  </div>
);
