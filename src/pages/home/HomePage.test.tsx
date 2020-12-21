import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HomePage } from './HomePage';
import { rest, server } from '../../test/mocks/server';
import { apiSettings } from '../../config/api';

it.todo('displays all uploaded images');

it('shows a message if the user has not uploaded any images', async () => {
  server.use(
    rest.get(`${apiSettings.baseURL}/images`, async (_req, res, ctx) => res(ctx.json([]))),
  );

  render(<HomePage />, {
    wrapper: Router,
  });

  expect(screen.queryByText(/Loading/)).toBeInTheDocument();
  expect(await screen.findByText(/No images uploaded/)).toBeInTheDocument();
});
