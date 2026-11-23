import { setupWorker } from 'msw/browser';

import { authHandlers } from './auth.handlers';
import { lookupsHandlers } from './lookups.handlers';
import { todayHandlers } from './today.handlers';

export const worker = setupWorker(...authHandlers, ...lookupsHandlers, ...todayHandlers);
