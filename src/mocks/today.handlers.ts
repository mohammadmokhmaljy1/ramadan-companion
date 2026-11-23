import { delay, http, HttpResponse } from 'msw';

import { sessions, todayData, users } from './db';
import { fail, ok } from './utils';

export const todayHandlers = [
  http.get('/me/today', async ({ request }) => {
    await delay(400);

    const authorization = request.headers.get('Authorization');
    const token = authorization?.replace(/^Bearer\s+/i, '');
    const userId = token ? sessions.get(token) : undefined;

    const user = users.find((item) => item.id === userId);

    if (!user) {
      const response = fail(401, 'UNAUTHORIZED', 'Authentication required');

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    return HttpResponse.json(ok(todayData));
  }),
];
