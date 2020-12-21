import { rest } from 'msw';
import { apiSettings } from '../../config/api';

export const handlers = [
  rest.get(`${apiSettings.baseURL}/images`, async (req, res, ctx) => res(ctx.json([]))),
];
