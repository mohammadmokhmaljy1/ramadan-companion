import { delay, http, HttpResponse } from 'msw';

import {
  calculationMethods,
  fastMissReasons,
  reminderTypes,
} from './db';
import { ok } from './utils';

export const lookupsHandlers = [
  http.get('/lookups/calculation-methods', async () => {
    await delay(400);

    return HttpResponse.json(ok(calculationMethods));
  }),

  http.get('/lookups/fast-miss-reasons', async () => {
    await delay(400);

    return HttpResponse.json(ok(fastMissReasons));
  }),

  http.get('/lookups/reminder-types', async () => {
    await delay(400);

    return HttpResponse.json(ok(reminderTypes));
  }),
];