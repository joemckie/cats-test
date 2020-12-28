import React from 'react';
import {
  findByText, render, screen,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from 'react-toast-notifications';
import { HomePage } from './HomePage';
import { rest, server } from '../../test/mocks/server';
import { apiSettings } from '../../config/api';
import { UploadedImage } from '../../reducers/images.reducer';
import { FavouriteImage } from '../../reducers/favourites.reducer';
import { ImageVote } from '../../reducers/votes.reducer';
import { StoreProvider } from '../../store';

function renderPage() {
  render(<HomePage />, {
    wrapper: ({ children }) => (
      <StoreProvider>
        <ToastProvider>
          <Router>
            {children}
          </Router>
        </ToastProvider>
      </StoreProvider>
    ),
  });
}

it('displays all uploaded images', async () => {
  renderPage();

  expect(screen.queryByText(/Loading/)).toBeInTheDocument();
  expect(await screen.findAllByTestId('cat-upload')).toHaveLength(4);
  expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
});

it('shows a message if the user has not uploaded any images', async () => {
  server.use(
    rest.get(`${apiSettings.baseURL}/images`, async (_req, res, ctx) => res(ctx.json([]))),
  );

  renderPage();

  expect(screen.queryByText(/Loading/)).toBeInTheDocument();
  expect(await screen.findByText(/No images uploaded/)).toBeInTheDocument();
  expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
});

it("highlights the user's favourites", async () => {
  server.use(
    rest.get(
      `${apiSettings.baseURL}/images`,
      async (_req, res, ctx) => res(ctx.json<UploadedImage[]>([
        {
          id: 'favourited',
          url: '',
          width: 100,
        },
        {
          id: 'not-favourited',
          url: '',
          width: 100,
        },
      ])),
    ),
    rest.get(
      `${apiSettings.baseURL}/favourites`,
      (_req, res, ctx) => res(ctx.json<FavouriteImage[]>([
        {
          id: '1',
          image_id: 'favourited',
        },
      ])),
    ),
  );

  renderPage();

  expect(await screen.findAllByTestId('favourited')).toHaveLength(1);
  expect(await screen.findAllByTestId('not-favourited')).toHaveLength(1);
});

it('shows the correct vote count', async () => {
  server.use(
    rest.get(
      `${apiSettings.baseURL}/images`,
      async (_req, res, ctx) => res(ctx.json<UploadedImage[]>([
        {
          id: 'voted',
          url: '',
          width: 100,
        },
      ])),
    ),
    rest.get(
      `${apiSettings.baseURL}/votes`,
      (_req, res, ctx) => res(ctx.json<ImageVote[]>([
        {
          id: '1',
          image_id: 'voted',
          value: 1,
        },
        {
          id: '2',
          image_id: 'voted',
          value: 1,
        },
        {
          id: '3',
          image_id: 'voted',
          value: -1,
        },
      ])),
    ),
  );

  renderPage();

  expect(await screen.findByTestId('votes-count')).toHaveTextContent('1');
});

it('votes an image up when the upvote button is pressed', async () => {
  server.use(
    rest.get(
      `${apiSettings.baseURL}/images`,
      async (_req, res, ctx) => res(ctx.json<UploadedImage[]>([
        {
          id: 'upvote-test',
          url: '',
          width: 100,
        },
      ])),
    ),
    rest.get(
      `${apiSettings.baseURL}/votes`,
      (_req, res, ctx) => res(ctx.json<ImageVote[]>([])),
    ),
    rest.post(
      `${apiSettings.baseURL}/votes`,
      (_req, res, ctx) => res(ctx.json({ message: 'SUCCESS' })),
    ),
  );

  renderPage();

  const catUpload = await screen.findByTestId('cat-upload');

  expect(await findByText(catUpload, '0')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('upvote-button'));

  expect(await findByText(catUpload, '1')).toBeInTheDocument();
});

it('votes an image down when the downvote button is pressed', async () => {
  server.use(
    rest.get(
      `${apiSettings.baseURL}/images`,
      async (_req, res, ctx) => res(ctx.json<UploadedImage[]>([
        {
          id: 'downvote-test',
          url: '',
          width: 100,
        },
      ])),
    ),
    rest.get(
      `${apiSettings.baseURL}/votes`,
      (_req, res, ctx) => res(ctx.json<ImageVote[]>([])),
    ),
    rest.post(
      `${apiSettings.baseURL}/votes`,
      (_req, res, ctx) => res(ctx.json({ message: 'SUCCESS' })),
    ),
  );

  renderPage();

  const catUpload = await screen.findByTestId('cat-upload');

  expect(await findByText(catUpload, '0')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('downvote-button'));

  expect(await findByText(catUpload, '-1')).toBeInTheDocument();
});

it('favourites an image when the favourite button is pressed', async () => {
  server.use(
    rest.get(
      `${apiSettings.baseURL}/images`,
      async (_req, res, ctx) => res(ctx.json<UploadedImage[]>([
        {
          id: 'favourite-test',
          url: '',
          width: 100,
        },
      ])),
    ),
    rest.get(
      `${apiSettings.baseURL}/favourites`,
      (_req, res, ctx) => res(ctx.json<FavouriteImage[]>([])),
    ),
    rest.post(
      `${apiSettings.baseURL}/favourites`,
      (_req, res, ctx) => res(ctx.json({ message: 'SUCCESS' })),
    ),
  );

  renderPage();

  userEvent.click(await screen.findByTestId('favourite-button'));

  expect(await screen.findByTestId('favourited')).toBeInTheDocument();
});

it('unfavourites an image when the unfavourite button is pressed', async () => {
  server.use(
    rest.get(
      `${apiSettings.baseURL}/images`,
      async (_req, res, ctx) => res(ctx.json<UploadedImage[]>([
        {
          id: 'unfavourite-test',
          url: '',
          width: 100,
        },
      ])),
    ),
    rest.get(
      `${apiSettings.baseURL}/favourites`,
      (_req, res, ctx) => res(ctx.json<FavouriteImage[]>([
        {
          id: '1',
          image_id: 'unfavourite-test',
        },
      ])),
    ),
    rest.delete(
      `${apiSettings.baseURL}/favourites/1`,
      (_req, res, ctx) => res(ctx.json({ message: 'SUCCESS' })),
    ),
  );

  renderPage();

  userEvent.click(await screen.findByTestId('favourite-button'));

  expect(await screen.findByTestId('not-favourited')).toBeInTheDocument();
});
