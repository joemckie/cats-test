import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UploadPage } from './UploadPage';
import { Routes } from '../../config/routes';
import { rest, server } from '../../test/mocks/server';
import { apiSettings } from '../../config/api';

it('uploads an image to the API after one is selected', async () => {
  server.use(
    rest.post(`${apiSettings.baseURL}/images/upload`, (_req, res, ctx) =>
      res(
        ctx.json({
          approved: 1,
        }),
      ),
    ),
  );

  render(<UploadPage />, {
    wrapper: ({ children }) => (
      <ToastProvider>
        <Router initialIndex={0} initialEntries={[Routes.Upload]}>
          <Route path={Routes.Upload}>{children}</Route>
          <Route exact path={Routes.Home}>
            Home Page
          </Route>
        </Router>
      </ToastProvider>
    ),
  });

  const file = new File([], 'cat.png', { type: 'image/png ' });

  expect(screen.queryByText('Home Page')).not.toBeInTheDocument();

  userEvent.upload(await screen.findByTestId('file-upload'), [file]);

  expect(await screen.findByText('Home Page')).toBeInTheDocument();
});
