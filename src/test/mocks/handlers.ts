import { rest } from 'msw';
import { apiSettings } from '../../config/api';
import { UploadedImage } from '../../reducers/images.reducer';
import { ImageVote } from '../../reducers/votes.reducer';
import { FavouriteImage } from '../../reducers/favourites.reducer';

export const handlers = [
  rest.get(`${apiSettings.baseURL}/images`, (_req, res, ctx) => res(ctx.json<UploadedImage[]>([
    {
      id: '1',
      url: 'http://placehold.it/100x100',
      width: 100,
    },
    {
      id: '2',
      url: 'http://placehold.it/100x100',
      width: 100,
    },
    {
      id: '3',
      url: 'http://placehold.it/100x100',
      width: 100,
    },
    {
      id: '4',
      url: 'http://placehold.it/100x100',
      width: 100,
    },
  ]))),
  rest.get(`${apiSettings.baseURL}/favourites`, (_req, res, ctx) => res(ctx.json<FavouriteImage[]>([
    {
      id: '1',
      image_id: '1',
    },
  ]))),
  rest.get(`${apiSettings.baseURL}/votes`, (_req, res, ctx) => res(ctx.json<ImageVote[]>([
    {
      id: '1',
      image_id: '1',
      value: 1,
    },
    {
      id: '2',
      image_id: '1',
      value: 1,
    },
    {
      id: '3',
      image_id: '1',
      value: 1,
    },
    {
      id: '4',
      image_id: '1',
      value: -1,
    },
  ]))),
];
