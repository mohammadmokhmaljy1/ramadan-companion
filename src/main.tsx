import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import './shared/i18n/i18n';
import './index.css';

import { router } from './app/router';
import { Toaster } from '@/shared/ui/sonner';

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === 'true') {
    const { worker } = await import('./mocks/browser');

    await worker.start();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </StrictMode>,
  );
});
