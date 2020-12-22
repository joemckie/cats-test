import { apiSettings } from '../config/api';

export async function apiRequest(url: string, data?: RequestInit) {
  return fetch(url, {
    ...data,
    headers: {
      ...data?.headers,
      'x-api-key': apiSettings.apiKey,
    },
  });
}
