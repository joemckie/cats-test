import { apiSettings } from '../config/api';

export async function apiRequest(url: string, data?: RequestInit) {
  const response = await fetch(url, {
    ...data,
    headers: {
      ...data?.headers,
      'x-api-key': apiSettings.apiKey,
    },
  });

  return response.json();
}
