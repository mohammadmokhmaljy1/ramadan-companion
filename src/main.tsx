import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/i18n/i18n';
import './index.css';
import App from './app/App.tsx';
import { Toaster } from '@/shared/ui/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
);
