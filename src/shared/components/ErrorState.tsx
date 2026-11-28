import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/button';

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry: () => void;
};

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-card border-border mx-auto flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-xl border p-8 text-center">
      <div className="bg-destructive/10 text-destructive flex size-14 items-center justify-center rounded-full">
        <AlertCircle className="size-7" />
      </div>

      <div className="space-y-2">
        <h3 className="text-foreground text-lg font-semibold">{title ?? t('errors.errorTitle')}</h3>
        <p className="text-muted-foreground text-sm">
          {description ?? t('errors.errorDescription')}
        </p>
      </div>

      <Button variant="outline" onClick={onRetry}>
        {t('errors.retry')}
      </Button>
    </div>
  );
}
