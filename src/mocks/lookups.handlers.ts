import { delay, http, HttpResponse } from 'msw';

import { cities, countries, prayerMethods } from './db';
import { ok } from './utils';

export const lookupsHandlers = [
  http.get('/lookups/countries', async () => {
    await delay(400);

    return HttpResponse.json(ok(countries));
  }),

  http.get('/lookups/cities', async () => {
    await delay(400);

    return HttpResponse.json(ok(cities));
  }),

  http.get('/lookups/prayer-methods', async () => {
    await delay(400);

    return HttpResponse.json(ok(prayerMethods));
  }),
];
