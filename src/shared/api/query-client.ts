import { MutationCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiError } from '@/shared/api/api-error';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import i18n from '@/shared/i18n/i18n';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      const message = getErrorMessage(error, (key) => String(i18n.t(key as never)));

      toast.error(message);
    },
  }),

  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,

      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false;
        }

        return failureCount < 1;
      },

      refetchOnWindowFocus: true,
    },
  },
});
