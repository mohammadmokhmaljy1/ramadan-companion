import { delay, http, HttpResponse } from 'msw';

import { todayData } from './db';
import { getAuthenticatedUser } from './auth.handlers';
import { fail, ok } from './utils';

export const todayHandlers = [
  http.get('/me/today', async ({ request }) => {
    await delay(400);

    const user = getAuthenticatedUser(request);

    if (!user) {
      const response = fail(401, 'UNAUTHORIZED', 'Authentication required');

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    if (!user.onboardingCompleted && user.role === 'USER') {
      const response = fail(
        403,
        'ONBOARDING_REQUIRED',
        'Complete onboarding first',
      );

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    return HttpResponse.json(ok(todayData));
  }),
];